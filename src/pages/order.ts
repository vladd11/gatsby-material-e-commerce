import OrderComponent from '../components/order/OrderComponent'
import Api from '../api/api'

import {graphql, navigate, useStaticQuery} from "gatsby";

import Product from "../interfaces/product";

interface OrderProps {
    location: {
        state: {
            cartProducts: Array<Product>
        }
    }
}

export default function Order(props: OrderProps) {
    const data = useStaticQuery(graphql`
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
    }
  }
}`)

    const api = new Api()

    if (!props.location.state) {
        // It's redirect and then() function never call.
        // noinspection JSIgnoredPromiseFromCall
        navigate("/")
        return
    }

    return OrderComponent({
        siteMetadata: data.site.siteMetadata,
        api: api,
        cartProducts: props.location.state.cartProducts
    })
}
