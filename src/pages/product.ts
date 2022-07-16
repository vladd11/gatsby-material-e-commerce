import type ProductType from "../interfaces/product"
import ProductComponent from "../components/products/ProductComponent";
import {getImage, ImageDataLike} from "gatsby-plugin-image";

type ProductProps = {
    pageContext: {
        data: {
            allFile: {
                edges: {
                    node: {
                        relativePath: string,
                        childImageSharp: ImageDataLike
                    }
                }[]
            }
        }
        product: ProductType
    }
};

type ProductData = {}

export default function Product(props: ProductProps) {
    const {data, product} = props.pageContext
    product.Image = getImage(data.allFile.edges.find(value => value.node.relativePath === product.ImageURI)!.node.childImageSharp)

    return ProductComponent({
        product: product
    })
}