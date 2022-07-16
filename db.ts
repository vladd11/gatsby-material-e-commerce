import {Driver} from "ydb-sdk";
import Product, {ProductPopularity} from "./src/interfaces/product";
import Long from "long";
import priceToNumber from "./priceToNumber";

const ydb = require('ydb-sdk')

const fetch = require("node-fetch")

export default class Database {
    private driver?: Driver;

    async readProducts(): Promise<Array<Product>> {
        return new Promise(async (resolve) => {
            await this.driver!.tableClient.withSessionRetry(async (session) => {
                await session.streamReadTable("products", (result1) => {
                        const products: Array<Product> = []

                        for (const row of result1.resultSet!.rows!) {
                            let price: number = priceToNumber(row.items![5].uint64Value!)

                            products.push({
                                // @ts-ignore
                                ProductID: row.items[1].bytesValue.toString('hex'),
                                Category: row.items![4].int32Value!,

                                Description: row.items![3].textValue!,
                                ImageURI: row.items![0].textValue!,

                                Price: price,
                                Title: row.items![2].textValue!,
                            })
                        }

                        resolve(products)
                    }
                )
            })
        })
    }

    public async readPopularity(): Promise<Array<ProductPopularity>> {
        return await this.driver!.tableClient.withSessionRetry(async (session) => {
            const resultQuery = await session.executeQuery(`
            SELECT * FROM (
                SELECT product_id, COUNT(product_id)
                FROM order_items GROUP BY product_id
            )
            ORDER BY column1 DESC;`)

            const arr: Array<ProductPopularity> = []
            for (const row of resultQuery.resultSets[0].rows!) {
                let popularity = row.items![0].uint64Value

                if (popularity instanceof Long) popularity = popularity.toNumber()

                const id = row.items![1].bytesValue
                if (!id) {
                    console.warn("ID of product is null!")
                    continue;
                }

                arr.push({
                    // It's Node.js code, toString("hex") is possible
                    // @ts-ignore
                    ProductID: id.toString("hex"),
                    popularity: popularity!
                })
            }
            return arr;
        })
    }

    async connect() {
        process.env.YDB_ACCESS_TOKEN_CREDENTIALS = (await (await fetch("https://iam.api.cloud.yandex.net/iam/v1/tokens", {
            method: "POST",
            body: JSON.stringify({
                yandexPassportOauthToken: process.env.OAUTH_TOKEN
            })
        })).json()).iamToken

        const authService = ydb.getCredentialsFromEnv();

        this.driver = new ydb.Driver({
            endpoint: process.env.ENDPOINT ?? "grpcs://ydb.serverless.yandexcloud.net:2135",
            database: process.env.DATABASE,
            authService
        });
        const timeout = 10000;
        if (!await this.driver!.ready(timeout)) {
            console.error(`Driver has not become ready in ${timeout}ms!`);
            process.exit(1);
        }
    }
}
