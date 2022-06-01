// Interface that describes GraphQL output
import {ImageDataLike} from "gatsby-plugin-image"
import Product from "./product"

export default interface Data {
    allSiteBuildMetadata: {
        nodes: Array<{ buildTime: string }>
    }
    allProducts: {
        nodes: Array<Product>
    },
    allFile: {
        edges: Array<ImageFile>
    }
    site: {
        siteMetadata: SiteInfo
    }
}

export interface SiteInfo {
    categories: Array<{ id: number, name: string }>,
    title: string,
    description: string,
    phone: string,

    address: string,
    addressLink: string
}

export interface ImageFile {
    node: Node
}

type Node = ImageDataLike & {
    relativePath: string,
    [key: string]: any
}