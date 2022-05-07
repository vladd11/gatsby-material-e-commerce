const path = require("path")
const fs = require("fs")
const transliteration = require('transliteration');

import Database from "./db";

// @ts-ignore
const fetch = require("node-fetch");

exports.createPages = async ({graphql, actions}) => {
    let result = await graphql(`
{
    allProducts {
        nodes {
            Category
            Description
            Price
            ProductID
            Title
            ImageURI
        }
    }
}`)
    result = result.data.allProducts.nodes

    const categories = new Map()
    for (const product of result) {
        let category = categories.get(product.Category)

        if (!category) {
            categories.set(product.Category, [])
            category = categories.get(product.Category)
        }

        category.push(product)
    }

    categories.forEach((value, key) => {
        fs.writeFileSync(path.join("./public", `${key.toString()}.json`), JSON.stringify(value))
    })
}

exports.sourceNodes = async (
    {
        actions,
        createContentDigest,
        createNodeId,
    }
) => {
    const {createNode} = actions

    const db = new Database()

    await db.connect();
    (await db.readProducts()).forEach((product) => {
        product.Price = Math.round(product.Price * 100) / 100
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
    })
}

interface Product {
    Category: string,
    Description: string,
    ProductID: string,
    ImageURI: string,
    Price: number,
    Title: string
}