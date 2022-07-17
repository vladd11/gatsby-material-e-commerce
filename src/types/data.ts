import Product from "./product"

import {FileNode} from "gatsby-plugin-image/dist/src/components/hooks";

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

export type SiteInfo = {
    title: string,
    description: string,
    phone: string,

    address: string,
    addressLink: string
}

export interface ImageFile {
    readonly node: ImgNode
}

type ImgNode = FileNode & {
    readonly relativePath: string,
    readonly childImageSharp: { readonly gatsbyImageData: import('gatsby-plugin-image').IGatsbyImageData } | null
}