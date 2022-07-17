import {FileNode} from "gatsby-plugin-image/dist/src/components/hooks";

export interface ImageFile {
    readonly node: ImgNode
}

type ImgNode = FileNode & {
    readonly relativePath: string,
    readonly childImageSharp: { readonly gatsbyImageData: import('gatsby-plugin-image').IGatsbyImageData } | null
}