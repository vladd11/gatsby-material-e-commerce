import {graphql, useStaticQuery} from "gatsby";
import OrderCompleteComponent from "../components/OrderCompleteComponent";
import Data from "../interfaces/data";

const OrderComplete = () => {
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

    return OrderCompleteComponent({data: data})
}

export default OrderComplete;
