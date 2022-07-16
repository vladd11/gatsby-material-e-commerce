import Product, {ProductPopularity} from "./src/interfaces/product";
import Database from "./db";
import {CreatePagesArgs, GatsbyNode} from "gatsby";

const path = require("path")
const fs = require("fs")

// It's used by Gatsby
// noinspection JSUnusedGlobalSymbols
export const createPages: GatsbyNode["createPages"] = async (props: CreatePagesArgs) => {
    let result: {
        data?: {
            allProducts?: {
                nodes?: Array<Product>
            },
            allPopularity?: {
                nodes?: Array<ProductPopularity>
            }
        },
    } = await props.graphql(`
{
    allFile {
        edges {
            node {
                relativePath
                childImageSharp {
                    gatsbyImageData(layout: CONSTRAINED)
                }
            }
        }
    }
    site {
        siteMetadata {
            title
            description
            phone

            address
            addressLink
        }
    }

    allProducts(sort: {fields: Popularity}) {
        nodes {
            Category
            Description
            Price
            ProductID
            Title
            ImageURI
            Popularity
        }
    }
}`)

    const products = result.data!.allProducts!.nodes!;

    const categories = new Map()
    products.forEach((product) => {
        let category = categories.get(product.Category)

        if (!category) {
            categories.set(product.Category, [])
            category = categories.get(product.Category)
        }

        category.push(product)
    })

    const categoriesDir = "./public/categories"
    if (!fs.existsSync(categoriesDir)) {
        fs.mkdirSync(categoriesDir)
    }

    categories.forEach((value, key) => {
        fs.writeFileSync(path.join(categoriesDir, `${key.toString()}.json`), JSON.stringify(value))
    })

    products.forEach(value => {
        props.actions.createPage({
            path: `/products/${value.ProductID}`,
            component: path.resolve('./src/pages/product.ts'),
            // In your blog post template's graphql query, you can use pagePath
            // as a GraphQL variable to query for data from the markdown file.
            context: {
                data: result.data,
                product: value
            },
        })
    })
}

// It's used by Gatsby
// noinspection JSUnusedGlobalSymbols
export const sourceNodes: GatsbyNode["sourceNodes"] = async (
    {
        actions,
        createContentDigest,
        createNodeId,
    }
) => {
    const {createNode} = actions

    const db = new Database()

    await db.connect();

    const popularity: Array<ProductPopularity> = await db.readPopularity();
    await db.readCarousels([]);

    (await db.readProducts()).forEach((product) => {
        product.Popularity = (popularity
            .find((value: ProductPopularity) => value.ProductID === product.ProductID) ?? {popularity: 0})
            .popularity

        product.Price = Math.round(product.Price * 100) / 100;
        createNode({
            ...product,
            id: createNodeId(`Products-${product.ProductID}`),
            parent: null,
            children: [],
            internal: {
                type: 'Products',
                contentDigest: createContentDigest(product),
            }
        })
    });
}
