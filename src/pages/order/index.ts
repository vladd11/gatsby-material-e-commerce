import OrderComponent from '../../components/order/OrderComponent'
import Api from '../../api/api'

import {graphql, navigate, useStaticQuery} from "gatsby";

import Product from "../../types/product";
import {ifClientSide} from "../../states/localStorageState";

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
        }
    `)

    const api = new Api()

    ifClientSide(() => {
        if (!props.location.state) {
            // It's redirect and then() function never call.
            // noinspection JSIgnoredPromiseFromCall
            navigate("/")
            return
        }
    })

    return OrderComponent({
        siteMetadata: data.site!.siteMetadata,
        api: api,
        cartProducts: props.location.state?.cartProducts
    })
}
