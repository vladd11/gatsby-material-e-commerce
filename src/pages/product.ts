import type ProductType from "../types/product"
import ProductComponent from "../components/products/ProductComponent";
import getImageByPath from "../../getImageByPath";

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

    product.Image = getImageByPath(data.allFile.edges, product.ImageURI);

    return ProductComponent({
        info: data.site!.siteMetadata,
        product: product,
        getImage: (uri) => getImageByPath(data.allFile.edges, uri)!
    })
}