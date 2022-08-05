import {Driver} from "ydb-sdk";
import Long from "long";

import priceToNumber from "./priceToNumber";
import Product from "./src/types/product";
import {Ydb} from "ydb-sdk-proto";

const ydb = require('ydb-sdk')

const fetch = require("node-fetch")

export default class Database {
    private driver?: Driver;

    async readProducts(): Promise<Array<Product>> {
        return new Promise(async (resolve) => {
            await this.driver!.tableClient.withSessionRetry(async (session) => {
                await session.streamReadTable("products", async(result1) => {
                        const products: Array<Product> = []

                        for (const row of result1.resultSet!.rows!) {
                            products.push({
                                // @ts-ignore - It's Node.js code
                                ProductID: row.items[1].bytesValue.toString('hex'),
                                Category: row.items![3].int32Value!,

                                DescriptionURI: row.items![4].textValue ?? "",
                                ImageURI: row.items![0].textValue!,

                                Price: priceToNumber(row.items![5].uint64Value!),
                                Title: row.items![2].textValue!,
                            })
                        }

                        resolve(products)
                    }
                )
            })
        })
    }

    public async readPopularity(products: Product[]): Promise<void> {
        return await this.driver!.tableClient.withSessionRetry(async (session) => {
            const resultQuery = await session.executeQuery(`
            SELECT * FROM (
                SELECT product_id, COUNT(product_id)
                FROM order_items GROUP BY product_id
            )
            ORDER BY column1 DESC;`)

            for (const row of resultQuery.resultSets[0].rows!) {
                let popularity = row.items![0].uint64Value!
                if (popularity instanceof Long) popularity = popularity.toNumber()

                // It's Node.js code
                // @ts-ignore
                const id = row.items![1].bytesValue?.toString("hex")
                if (!id) {
                    console.warn("ID of product is null!")
                    continue;
                }

                const product = products.find(value => value.ProductID === id)
                if (product) {
                    product.Popularity = popularity ?? 0;
                }
            }
        })
    }

    public async readCarousels(products: Product[]): Promise<void> {
        await this.driver!.tableClient.withSessionRetry(async (session) => {
            let result: Ydb.Table.ReadTableResult;
            await session.streamReadTable("image_carousels", dbResult =>
                result = dbResult
            );
            return result!.resultSet?.rows?.forEach((response) => {
                // It's Node.js code
                // @ts-ignore
                const product = products.find(value => value.ProductID === response.items![1].bytesValue!.toString("hex"))
                if (product) {
                    if (!product.Images) product.Images = [{
                        alt: product.Title,
                        image_uri: product.ImageURI
                    }];

                    product.Images.push({
                        alt: response.items![2].textValue!,
                        image_uri: response.items![3].textValue!
                    });
                }
            });
        })
    }

    async connect() {
        try {
            const result = await fetch("https://iam.api.cloud.yandex.net/iam/v1/tokens", {
                method: "POST",
                body: JSON.stringify({
                    yandexPassportOauthToken: process.env.OAUTH_TOKEN
                })
            });
            if (!result.ok) {
                console.error("Having ")
                return;
            }

            const token = (await result.json()).iamToken;
            if (!token) {
                console.error(`Can't request IAM token. Status code: ${result.status} ${result.statusText}`);
                return;
            }
            process.env.YDB_ACCESS_TOKEN_CREDENTIALS = token;
        } catch (e) {
            console.error("Can't connect to https://iam.api.cloud.yandex.net", e)
            return;
        }

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
