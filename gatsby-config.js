module.exports = {
    plugins: [
        'gatsby-plugin-react-helmet',
        {
            resolve: `gatsby-source-sql`,
            options: {
                typeName: "content",
                fieldName: "products",
                dbEngine: {
                    client: 'sqlite3',
                    connection: {
                        filename: './content.sqlite'
                    }
                },
                queryChain: function(x) {
                    return x
                        .select(
                            "products.id as ProductID",
                            "products.category as Category",
                            "products.description as Description",
                            "products.image_uri as ImageURI",
                            "products.price as Price",
                            "products.title as Title",
                        )
                        .from("products")
                }
            }
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                path: `${__dirname}/static`,
                name: "images",
            },
        },
        // If you want to use styled components you should add the plugin here.
        // 'gatsby-plugin-styled-components',
        'gatsby-plugin-mui-emotion',
        `gatsby-plugin-preact`,

        `gatsby-plugin-image`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
    ],
    siteMetadata: {
        title: 'My page',
    },
};
