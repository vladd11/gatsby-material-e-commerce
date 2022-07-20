type ImageFile = {
    readonly node: {
        readonly relativePath: string; readonly childImageSharp: {
            readonly gatsbyImageData: import('gatsby-plugin-image').IGatsbyImageData
        } | null
    }
}

export default ImageFile;
