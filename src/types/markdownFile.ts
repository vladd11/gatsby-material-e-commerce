type markdownFile = {
    readonly relativePath: string,
    readonly childMarkdownRemark: { readonly html: string | null } | null
}

export default markdownFile;