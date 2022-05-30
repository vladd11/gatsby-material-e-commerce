import {graphql, useStaticQuery} from "gatsby";
import {useEffect, useState} from "react";
import Api, {OrderResponse} from "../api/api";
import OrderCompleteComponent from "../components/OrderCompleteComponent";
import Data from "../interfaces/data";

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

    const [orderResponse, setOrderResponse] = useState<OrderResponse>(location.state as OrderResponse);

    useEffect(() => {
        const api = new Api();
        api.jwtToken = localStorage.getItem("jwt_token")

        if (!orderResponse) {
            const params = new URLSearchParams(location.search);
            const orderID = params.get("orderID");

            api.getOrder(orderID).then((result) => {
                setOrderResponse(result)
            })
        }
    }, [])

    return OrderCompleteComponent({data: data})
}

export default OrderComplete;
