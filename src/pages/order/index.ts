import OrderComponent from '../../components/order/OrderComponent'
import Api from '../../api/api'

import {graphql, navigate, useStaticQuery} from "gatsby";

import Product from "../../types/product";
import {getImageByPath} from '../../../getResourceByPath';
import {useEffect} from 'react';

interface OrderProps {
    location: {
        state: {
            cartProducts: Array<Product>
        }
    }
}

export default function IndexOrderPage(props: OrderProps) {
    const data = useStaticQuery<Queries.IndexOrderPageQuery>(graphql`
        query IndexOrderPage {
            site {
                siteMetadata {
                    title
                    description
                }
            }
            allFile(filter: {sourceInstanceName: {eq: "images"}}) {
                edges {
                    node {
                        relativePath
                        childImageSharp {
                            gatsbyImageData(width: 200)
                        }
                    }
                }
            }
        }
    `)

    const api = new Api()

    useEffect(() => {
        if (!props.location.state) {
            // It's redirect and then() function never call.
            // noinspection JSIgnoredPromiseFromCall
            navigate("/")
            return
        }
    }, [])

    return OrderComponent({
        siteMetadata: data.site!.siteMetadata,
        getImage: imageUri => getImageByPath(data.allFile.edges, imageUri)!,
        api: api,
        cartProducts: props.location.state?.cartProducts
    })
}
