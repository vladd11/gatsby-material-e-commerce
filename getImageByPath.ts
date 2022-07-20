import {getImage, IGatsbyImageData} from "gatsby-plugin-image";
import ImageFile from "./src/types/imageFile";

export default function getImageByPath(files: ReadonlyArray<ImageFile>,
                                       uri: string): IGatsbyImageData | undefined {
    const file = files.find(value => value.node.relativePath === uri)
    if (!file?.node.childImageSharp) {
        console.warn(`Can't find image ${uri}`);
        return undefined;
    }

    return getImage(file.node.childImageSharp.gatsbyImageData)
}