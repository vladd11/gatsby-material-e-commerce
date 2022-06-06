import {graphql, useStaticQuery} from "gatsby";

import "../interfaces/product"

import IndexComponent from "../components/index/IndexComponent"

export default function IndexPage() {
    const data = useStaticQuery(graphql`
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

    return IndexComponent({data: data});
}
