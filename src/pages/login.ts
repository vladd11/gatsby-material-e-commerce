import LoginComponent from "../components/login/LoginComponent";
import {graphql, useStaticQuery} from "gatsby";

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
}`)

    return LoginComponent({siteMetadata: data.site.siteMetadata})
}
