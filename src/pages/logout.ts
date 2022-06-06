import {graphql, useStaticQuery} from "gatsby";
import LogoutComponent from "../components/LogoutComponent";

export default function Logout() {
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

    return LogoutComponent({siteMetadata: data.site.siteMetadata});
}