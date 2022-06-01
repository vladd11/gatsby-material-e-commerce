import {graphql, useStaticQuery} from "gatsby";
import {useEffect, useState} from "react";
import Api from "../api/api";
import OrderCompleteComponent from "../components/OrderCompleteComponent";
import Data from "../interfaces/data";
import Order from "../interfaces/order";

const OrderComplete = ({location}) => {
    const data: Data = useStaticQuery(graphql`
{
  allSiteBuildMetadata {
    nodes {
      buildTime
    }
  }
  allProducts(limit: 12, sort: {fields: Popularity}) {
    nodes {
      Category
      Description
      Price
      ProductID
      Title
      ImageURI
    }
  }
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

    const [orderResponse, setOrderResponse] = useState<Order>(location.state as Order);

    const api = new Api();
    useEffect(() => {
        if (!orderResponse) {
            const params = new URLSearchParams(location.search);
            const orderID = params.get("orderID");

            api.getOrder(orderID).then((result) => {
                setOrderResponse(result)
            })
        }
    }, [])

    return OrderCompleteComponent({
        info: data.site.siteMetadata,
        order: orderResponse,
        allFile: data.allFile
    })
}

export default OrderComplete;
