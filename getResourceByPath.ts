import {getImage, IGatsbyImageData} from "gatsby-plugin-image";
import ImageFile from "./src/types/imageFile";
import MarkdownFile from "./src/types/markdownFile"

export function getImageByPath(files: ReadonlyArray<ImageFile>,
                               uri: string): IGatsbyImageData | undefined {
    const file = files.find(value => value.node.relativePath === uri)
    if (!file?.node.childImageSharp) {
        console.warn(`Can't find image ${uri}`);
        return undefined;
    }

    return getImage(file.node.childImageSharp.gatsbyImageData)
}

export function getDescriptionByPath(files: ReadonlyArray<MarkdownFile>, uri: string): string | undefined | null {
    return files.find(value => value.relativePath === uri)?.childMarkdownRemark?.html
}

export function getRawDescriptionByPath(files: ReadonlyArray<MarkdownFile>, uri: string): string | undefined | null {
    return files.find(value => value.relativePath === uri)?.childMarkdownRemark?.excerpt
}
