import Database from "./db";
import {GatsbyNode} from "gatsby";

const path = require("path")
const fs = require("fs")

// It's used by Gatsby
// noinspection JSUnusedGlobalSymbols
export const createPages: GatsbyNode["createPages"] = async ({actions, graphql}) => {
    const result = await graphql<Queries.ProductPageQuery>(`
query ProductPage {
    allFile(filter: {sourceInstanceName: {eq: "images"}}) {
        edges {
            node {
                relativePath
                childImageSharp {
                    gatsbyImageData(width: 200)
                }
            }
        }
    }
    bigImages:allFile(filter: {sourceInstanceName: {eq: "images"}}) {
        edges {
            node {
                relativePath
                childImageSharp {
                    gatsbyImageData(layout: CONSTRAINED)
                }
            }
        }
    }
    shortTexts:allFile(filter: {sourceInstanceName: {eq: "shortTexts"}}) {
        nodes {
            relativePath
            childMarkdownRemark {
                html
                excerpt
            }
        }
    }
    longTexts:allFile(filter: {sourceInstanceName: {eq: "longTexts"}}) {
        nodes {
            relativePath
            childMarkdownRemark {
                html
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
            DescriptionURI
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

    if (result.data === undefined) throw new Error("result.data of query is undefined");

    const products = result.data.allProducts!.nodes!;

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
export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({actions}) => {
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
    type Products implements Node {
        Category: Int!,
        DescriptionURI: String!,
        ImageURI: String!,
        Price: Float!,
        ProductID: String!,
        Title: String!
    }
  `)
}
