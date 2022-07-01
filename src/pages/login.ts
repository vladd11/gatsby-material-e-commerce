import {graphql, useStaticQuery} from "gatsby";

import LoginComponent from "../components/login/LoginComponent";
import Api from "../api/api";

export default function Login() {
    const data = useStaticQuery(graphql`
        {
            site {
                siteMetadata {
                    title
                    description
                    phone

                    address
                    addressLink
                }
            }
        }
    `)

    return LoginComponent({siteMetadata: data.site.siteMetadata, api: new Api()})
}
