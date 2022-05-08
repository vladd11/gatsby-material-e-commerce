import {Driver, Session} from "ydb-sdk";
import Product from "./src/interfaces/Product";

const ydb = require('ydb-sdk')

const fetch = require("node-fetch")

class PriceIsTooBigException extends Error {
    constructor(number) {
        super(`Product price (${number}) is bigger than MAX_SAFE_INTEGER. This may cause bugs on some users`);
    }
}

export default class Database {
    private driver: Driver;

    async readProducts(): Promise<Array<Product>> {
        return new Promise((resolve, reject) => {
            this.driver.tableClient.withSession(async (session) => {
                resolve(this._readProducts(session))
            })
        })
    }

    private async _readProducts(session: Session): Promise<Array<Product>> {
        return new Promise(async (resolve, reject) => {
            await session.streamReadTable("products", (result1) => {
                    const products: Array<Product> = []

                    for (const row of result1.resultSet.rows) {
                        let price: (number | Long) = row.items[5].uint64Value!
                        if (typeof price === "number") {
                            price = price / 100
                        } else {
                            price = price.divide(100).toNumber()
                            if (price >= Number.MAX_SAFE_INTEGER) {
                                throw new PriceIsTooBigException(price)
                            }
                        }

                        products.push({
                            // @ts-ignore
                            ProductID: row.items[1].bytesValue.toString('hex'),
                            Category: row.items[4].int32Value,

                            Description: row.items[3].textValue,
                            ImageURI: row.items[0].textValue,

                            Price: price,
                            Title: row.items[2].textValue,
                        })
                    }

                    resolve(products)
                }
            )
        });
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
            endpoint: process.env.ENDPOINT || "grpcs://ydb.serverless.yandexcloud.net:2135",
            database: process.env.DATABASE,
            authService
        });
        const timeout = 10000;
        if (!await this.driver.ready(timeout)) {
            console.error(`Driver has not become ready in ${timeout}ms!`);
            process.exit(1);
        }
    }

    async disconnect() {
        await this.driver.destroy();
    }
}
