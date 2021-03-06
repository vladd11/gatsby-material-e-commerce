import Database from "./db";
import {GatsbyNode} from "gatsby";

const path = require("path")
const fs = require("fs")

// It's used by Gatsby
// noinspection JSUnusedGlobalSymbols
export const createPages: GatsbyNode["createPages"] = async ({actions, graphql}) => {
    let result = await graphql<Queries.ProductPageQuery>(`
query ProductPage {
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
            Images {
                alt
                image_uri
            }
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

    // @ts-ignore
    products.forEach(value => {
        actions.createPage({
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
    }
) => {
    const {createNode} = actions

    const db = new Database()

    await db.connect();

    const products = await db.readProducts();
    await db.readPopularity(products);
    await db.readCarousels(products);

    products.forEach((product) => {
        product.Price = Math.round(product.Price * 100) / 100;
        createNode({
            ...product,
            id: product.ProductID,
            parent: null,
            children: [],
            internal: {
                type: 'Products',
                contentDigest: createContentDigest(product),
            }
        })
    });
}

// It's used by Gatsby
// noinspection JSUnusedGlobalSymbols
export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({ actions }) => {
    actions.createTypes(`
    type Site {
      siteMetadata: SiteMetadata!
    }
    type SiteMetadata {
      title: String!,
      description: String!,
      phone: String!,
      addressLink: String!,
      address: String!
    }
  `)
}
