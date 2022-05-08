module.exports = {
    plugins: [
        'gatsby-plugin-react-helmet',
        {
            resolve: "gatsby-source-filesystem",
            options: {
                path: `${__dirname}/static`,
                name: "images",
            },
        },

        {
            resolve: 'gatsby-plugin-robots-txt',
            options: {
                host: 'https://gatsby-test-nuk.pages.dev',
                sitemap: 'https://gatsby-test-nuk.pages.dev/sitemap.xml',
                policy: [{userAgent: '*', allow: '/'}]
            }
        },

        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `GatsbyJS`,
                short_name: `GatsbyJS`,
                start_url: `/`,
                background_color: `#f7f0eb`,
                theme_color: `#a2466c`,
                display: `standalone`,
                icons: [
                    {
                        "src": "icons/icon-192x192.png",
                        "sizes": "192x192",
                        "type": "image/png"
                    },
                    {
                        "src": "icons/icon-256x256.png",
                        "sizes": "256x256",
                        "type": "image/png"
                    },
                    {
                        "src": "icons/icon-384x384.png",
                        "sizes": "384x384",
                        "type": "image/png"
                    },
                    {
                        "src": "icons/icon-512x512.png",
                        "sizes": "512x512",
                        "type": "image/png"
                    }
                ]
            },
        },
        // If you want to use styled components you should add the plugin here.
        // 'gatsby-plugin-styled-components',
        'gatsby-plugin-mui-emotion',
        `gatsby-plugin-preact`,
        `gatsby-plugin-sass`,

        `gatsby-plugin-image`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
    ],
    siteMetadata: {
        title: 'Shop',
        description: "Just a shop site",
        phone: "79170324874",

        addressLink: "https://yandex.ru/maps/51/samara/house/novo_vokzalnaya_ulitsa_28/YUkYdANiTUEGQFtpfX5wd3lmYg==",
        address: "Самара, Ново-Вокзальная улица, 18",
    },
};
