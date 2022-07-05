import OrderResponse from "../interfaces/order";
import {ifClientSide} from "../states/localStorageState";
import Product from "../interfaces/product";
import {setPhone} from "./utils";
import {HTTPError} from "./exceptions";
import {TimeRange} from "../currentDateTime";

const url = process.env.GATSBY_FUNCTION_URL!;
export default class Api {
    jwtToken?: string | null;
    headers?: Headers;

    constructor() {
        ifClientSide(() => {
            this.jwtToken = localStorage.getItem("jwt_token")
            this.headers = new Headers((this.jwtToken) ? {
                Authorization: `Bearer ${this.jwtToken}`
            } : {})
        })
    }

    setJWTToken(token: string) {
        localStorage.setItem("jwt_token", token);

        this.headers?.set("Authorization", `Bearer ${this.jwtToken}`)
        this.jwtToken = token;
    }

    async getOrder(orderID: string): Promise<OrderResponse | null | undefined> {
        if (!this.jwtToken) return null;

        const result = await fetch(`${url}/order/${orderID}`, {headers: this.headers});

        if(result.ok) {
            return await result.json()
        } else throw new HTTPError(result.status)
    }

    async login(phone: string, code: number): Promise<boolean> {
        const resultFetch = await fetch(`${url}/login`, {
            headers: this.headers,
            method: "POST",
            body: JSON.stringify({
                phone: phone,
                code: code
            })
        })

        if (resultFetch.ok) {
            const result = await resultFetch.json()

            if (result?.token) {
                this.setJWTToken(result.token);
                setPhone(phone)

                return true;
            }
        }

        return false;
    }

    async sendCodeAndOrder(cartProducts: Array<any>,
                           phone: string,
                           address: string,
                           paymentMethod: string,
                           time: TimeRange,
                           code: number): Promise<OrderResponse> {
        const resultFetch = await fetch(`${url}/order`, {
            method: "POST",
            body: JSON.stringify({
                products: cartProducts.map(product => {
                    return {
                        id: product.ProductID,
                        count: product.count
                    }
                }),
                code: code,
                paymentMethod: paymentMethod,
                phone: phone,
                address: address,
                time: time
            })
        })

        if (resultFetch.ok) {
            return await resultFetch.json();
        } else throw new HTTPError(resultFetch.status)
    }

    async resendCode(phone: string): Promise<void> {
        const resultFetch = await fetch(`${url}/resend-code`, {
            method: "POST",
            body: JSON.stringify({
                phone: phone
            })
        })

        if(!resultFetch.ok) throw new HTTPError(resultFetch.status)
    }

    /**
     *
     * @param cartProducts
     * @param phone
     * @param address
     * @param paymentMethod
     * @param time range
     */
    async order(cartProducts: Array<Product>,
                phone: string,
                address: string,
                paymentMethod: string,
                time: TimeRange): Promise<OrderResponse> {
        const fetchResult = await fetch(`${url}/order`, {
            headers: this.headers,
            method: "POST",
            body: JSON.stringify({
                products: cartProducts.map(product => {
                    return {
                        id: product.ProductID,
                        count: product.count
                    }
                }),
                paymentMethod: paymentMethod,
                phone: phone,
                address: address,
                time: time
            })
        });

        if (fetchResult.ok) {
            return await fetchResult.json()
        } else throw new HTTPError(fetchResult.status)
    }


    async sendCode(phone: string) {
        const result = await fetch(`${url}/send-code`, {
            headers: this.headers,
            method: "POST",
            body: JSON.stringify({phone: `+7${phone}`})
        })
        if (!result.ok) {
            throw new HTTPError(result.status);
        }
    }
}
