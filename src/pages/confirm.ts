import {graphql, navigate, useStaticQuery} from "gatsby";

import Api from "../api/api";

import ConfirmComponent from "../components/order/ConfirmComponent";

interface ConfirmState {
    phone: string
}

interface ConfirmProps {
    location: {
        state: ConfirmState
    }
}

const Confirm = (props: ConfirmProps) => {
    const api = new Api()
    const data = useStaticQuery<Queries.ConfirmPageQuery>(graphql`
        query ConfirmPage {
            site {
                siteMetadata {
                    title
                    description
                }
            }
        }
    `)

    return ConfirmComponent({
        siteMetadata: data.site!.siteMetadata,
        phone: props.location.state?.phone,
        onSubmit: async (code) => {
            const result = await api.login(props.location.state.phone, code)

            if (result) {
                await navigate("/")
            }
        },
        api: api
    })
}

// Actually used by Gatsby
// noinspection JSUnusedGlobalSymbols
export default Confirm;