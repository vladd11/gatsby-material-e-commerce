type markdownFile = {
    readonly relativePath: string,
    readonly childMarkdownRemark: {
        readonly excerpt?: string | null
        readonly html: string | null
    } | null
}

export default markdownFile;