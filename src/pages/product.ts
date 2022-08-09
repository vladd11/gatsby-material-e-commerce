import type ProductType from "../types/product"
import ProductPageComponent from "../components/products/ProductPageComponent";
import {getDescriptionByPath, getImageByPath, getRawDescriptionByPath} from "../../getResourceByPath";

type ProductProps = {
    pageContext: {
        data: Queries.ProductPageQuery
        product: ProductType
    }
};

export default function Product(props: ProductProps) {
    const {data, product} = props.pageContext
    if (data == undefined) { // IDK why sometimes data and product is undefined
        return;
    }

    return ProductPageComponent({
        info: data.site!.siteMetadata,
        product: product,
        getImage: (uri) => getImageByPath(data.allFile.edges, uri)!,
        getBigImage: (uri) => getImageByPath(data.bigImages.edges, uri)!,
        getDescription: uri => getDescriptionByPath(props.pageContext.data.longTexts.nodes, uri)!,
        getRawDescription: uri => getRawDescriptionByPath(props.pageContext.data.shortTexts.nodes, uri)!
    })
}
