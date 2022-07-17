import {getImage, IGatsbyImageData} from "gatsby-plugin-image";
import {ImageFile} from "./src/types/data";

export default function getImageByPath(files: ImageFile[], uri: string): IGatsbyImageData | undefined {
    return getImage(files.find(value => value.node.relativePath === uri)!.node)
}