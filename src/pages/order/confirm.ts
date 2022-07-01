import {graphql, useStaticQuery} from "gatsby";

import Api from "../../api/api";

import ConfirmComponent from "../../components/order/ConfirmComponent";

import redirect from "../../redirect";
import Product from "../../interfaces/product";
import {toUnixTime} from "../../api/utils";

interface ConfirmState {
    cartProducts: Array<Product>,
    address: string,
    paymentMethod: string,
    phone: string,
    time: Date
}

interface ConfirmProps {
    location: {
        state: ConfirmState
    }
}

type ConfirmData = {
    site: {
        siteMetadata: {
            title: string,
            description: string
        }
    }
};

const Confirm = (props: ConfirmProps) => {
    const api = new Api()
    const data: ConfirmData = useStaticQuery(graphql`
        {
            site {
                siteMetadata {
                    title
                    description
                }
            }
        }
    `)

    const state = props.location.state

    return ConfirmComponent({
        siteMetadata: data.site.siteMetadata,
        phone: props.location.state?.phone,
        onSubmit: async (code) => {
            await redirect(
                await api.sendCodeAndOrder(
                    state.cartProducts,
                    state.phone,
                    state.address,
                    state.paymentMethod,
                    state.time,
                    code
                ),
                state.phone,
                state.address,
                toUnixTime(state.time),
                state.paymentMethod
            )
        },
        api: api
    })
}

// Actually used by Gatsby
// noinspection JSUnusedGlobalSymbols
export default Confirm;