import {Client, HttpsClient, JSONRPCRequest} from "jayson";
import CartProduct from "./cartProduct";
import OrderResponse from "./orderResponse";

class Api {
    private jwtToken?: string;
    private client: HttpsClient;

    constructor(functionURL: string, jwtToken?: string) {
        this.client = Client.https({
            host: functionURL
        })
        this.jwtToken = jwtToken;
    }

    order(cartProducts: Array<CartProduct>, phone: string, address: string): Promise<OrderResponse> {
        const request: Array<JSONRPCRequest> = []
        if (this.jwtToken === null) {
            request.push({
                jsonrpc: '2.0',
                id: 0,
                method: 'register',
                params: {
                    phone: phone
                },
            })
        }

        request.push({
            jsonrpc: '2.0',
            id: 1,
            method: 'add_order',
            params: {
                products: cartProducts.map(
                    (cartProduct: CartProduct) => {
                        return {
                            id: cartProduct.id,
                            count: cartProduct.count
                        }
                    }
                ),
                address: address
            }
        })

        return new Promise<OrderResponse>((resolve) => {
            this.client.request(request, (err, results) => {
                console.log(err)

                if(this.jwtToken === null) {
                    this.jwtToken = results[0]
                }

                resolve({
                    newJWTToken: this.jwtToken
                })
            })
        })
    }
}