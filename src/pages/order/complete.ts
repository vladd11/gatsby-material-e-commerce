import {graphql, navigate, PageProps, useStaticQuery} from "gatsby";
import {useEffect, useState} from "react";
import Api from "../../api/api";

import OrderCompleteComponent from "../../components/order/OrderCompleteComponent";

import Data from "../../interfaces/data";
import OrderResponse from "../../interfaces/order";

import {initializeApp} from "firebase/app";
import {getMessaging, getToken} from "firebase/messaging";


type OrderCompleteProps = PageProps & {
    location: {
        state: OrderResponse
    }
}

// noinspection JSUnusedGlobalSymbols
export default function Complete(props: OrderCompleteProps) {
    const data: Data = useStaticQuery(graphql`
{
  allFile {
    edges {
      node {
        relativePath
        childImageSharp {
          gatsbyImageData(width: 200)
        }
      }
    }
  }
  site {
    siteMetadata {
      title
      description
      phone
      
      address
      addressLink
    }
  }
}`)

    const [orderResponse, setOrderResponse] = useState<OrderResponse>(props.location.state);

    const api = new Api();
    useEffect(() => {
        if (!orderResponse) {
            const params = new URLSearchParams(location.search);
            const orderID = params.get("orderID");

            if (!orderID) {
                // It's redirect
                // noinspection JSIgnoredPromiseFromCall
                navigate("/404")
            } else {
                api.getOrder(orderID).then((result) => {
                    if (!result) {
                        navigate("/404");
                        return
                    }

                    setOrderResponse(result)
                })
            }
        }
    }, [])

    return OrderCompleteComponent({
        info: data.site.siteMetadata,
        order: orderResponse,
        allFile: data.allFile,
        enableNotifications: () => {
            return new Promise((resolve) => {
                if (Notification.permission !== "granted") {
                    Notification.requestPermission().then((result) => {
                        if (result == "granted") {
                            initNotifications(api)
                        }
                        resolve(result == "granted")
                    });
                } else {
                    resolve(true);
                    initNotifications(api);
                }
            })
        }
    })
}

function initNotifications(api: Api) {
    const messaging = getMessaging(initializeApp(JSON.parse(process.env.GATSBY_FIREBASE!)));
    getToken(messaging, {vapidKey: process.env.GATSBY_VAPID_KEY}).then((currentToken) => {
        if (currentToken) {
            api.enableNotifications(currentToken).catch(console.error)
        } else {
            console.error("FCM token is null")
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving FCM token. ', err);
    });
}
