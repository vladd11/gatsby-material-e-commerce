// Interface that describes GraphQL output
import {ImageDataLike} from "gatsby-plugin-image"
import Product from "./Product"

export default interface Data {
    allProducts: {
        nodes: Array<Product>
    },
    allFile: {
        edges: Array<ImageFile>
    }
    site: {
        siteMetadata: {
            title: string,
            description: string,
            phone: string,

            address: string,
            addressLink: string
        }
    }
}

interface ImageFile {
    node: Node
}

type Node = ImageDataLike & {
    relativePath: string
}