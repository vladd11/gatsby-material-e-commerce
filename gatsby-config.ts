import type { GatsbyConfig } from "gatsby"

const config: GatsbyConfig = {
    plugins: [
        'gatsby-plugin-react-helmet',
        {
            resolve: "gatsby-source-filesystem",
            options: {
                path: `${__dirname}/static/images`,
                name: "images",
            },
        },
        {
            resolve: "gatsby-plugin-react-svg",
            options: {
                rule: {
                    include: /icons/
                }
            }
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
                name: `Shop`,
                short_name: `Shop`,
                start_url: `/`,
                background_color: `#fff`,
                theme_color: `#556cd6`,
                display: `standalone`,
                icon: "icon.png",
                icon_options: {
                    purpose: `any maskable`,
                },
            },
        },

        {
            resolve: `gatsby-plugin-offline`,
            options: {
                precachePages: ["/"]
            },
        },
        {
            resolve: `gatsby-plugin-emotion`,
            options: {
                // Accepts the following options, all of which are defined by `@emotion/babel-plugin` plugin.
                // The values for each key in this example are the defaults the plugin uses.
                sourceMap: true,
                autoLabel: "dev-only",
                labelFormat: `[local]`,
                cssPropOptimization: true,
            },
        },
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
        address: "Самара, Ново-Вокзальная улица, 18"
    },
};

export default config;
