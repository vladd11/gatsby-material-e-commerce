import {graphql, useStaticQuery} from "gatsby";

import "../interfaces/Product"

import Index from "../components/Index"

export default function IndexPage() {
    const data = useStaticQuery(graphql`
{
  allProducts(limit: 12) {
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

    return Index({data: data});
}
