import {graphql, useStaticQuery} from "gatsby";

import Api from "../api/api";

import ConfirmComponent, {ConfirmComponentState} from "../components/order/ConfirmComponent";

interface ConfirmProps {
    location: {
        state: ConfirmComponentState
    }
}

const Confirm = (props: ConfirmProps) => {
    const api = new Api()
    const data: {
        site: {
            siteMetadata: {
                title: string,
                description: string
            }
        }
    } = useStaticQuery(graphql`
{
  site {
    siteMetadata {
      title
      description
    }
  }
}`)

    return ConfirmComponent({
        siteMetadata: data.site.siteMetadata,
        state: props.location.state,
        api: api
    })
}

// Actually used by Gatsby
// noinspection JSUnusedGlobalSymbols
export default Confirm;