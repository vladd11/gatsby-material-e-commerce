// Interface that describes GraphQL output
import {ImageDataLike} from "gatsby-plugin-image"
import Product from "./product"

export default interface Data {
    allProducts: {
        nodes: Array<Product>
    },
    allFile: {
        edges: Array<ImageFile>
    }
    site: {
        siteMetadata: {
            categories: Array<{id: number, name: string}>,
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