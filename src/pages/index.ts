import {graphql, useStaticQuery} from "gatsby";

import "../types/product"

import IndexComponent from "../components/index/IndexComponent"
import {logout} from "../api/utils";

interface IndexPageProps {
    location: {
        state: {
            logout?: boolean
        }
    }
}

export default function IndexPage(props: IndexPageProps) {
    const data = useStaticQuery(graphql`
        query IndexPage {
            allSiteBuildMetadata {
                nodes {
                    buildTime
                }
            }
            allProducts(limit: 12, sort: {fields: Popularity}) {
                nodes {
                    Category
                    DescriptionURI
                    Price
                    ProductID
                    Title
                    ImageURI
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
            shortTexts:allFile(filter: {sourceInstanceName: {eq: "shortTexts"}}) {
                nodes {
                    relativePath
                    childMarkdownRemark {
                        html
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
        }
    `)

    if (props.location.state?.logout) {
        logout();
    }

    return IndexComponent({data: data});
}
