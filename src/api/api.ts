import {JSONRPCClient, JSONRPCRequest} from "./client";

class Api {
    private jwtToken?: string;
    private client: JSONRPCClient;

    constructor(functionURL: string, jwtToken?: string) {
        this.client = new JSONRPCClient(functionURL);

        this.jwtToken = jwtToken;
    }

    async order(cartProducts: Array<any>, phone: string, address: string, paymentMethod: string): Promise<string> {
        const request: Array<JSONRPCRequest> = []
        if (this.jwtToken === null) {
            request.push({
                jsonrpc: '2.0',
                id: "0",
                method: 'register',
                params: {
                    phone: phone,
                    verify: false
                },
            })
        } else {
            request.push({
                jsonrpc: '2.0',
                id: '0',
                method: 'verify',
                params: {
                    token: this.jwtToken
                }
            })
        }

        request.push({
            jsonrpc: '2.0',
            id: "1",
            method: 'add_order',
            params: {
                products: cartProducts.map(
                    (cartProduct) => {
                        return {
                            id: cartProduct.ProductID,
                            count: 1
                        }
                    }
                ),
                paymentMethod: paymentMethod,
                address: address
            }
        })

        const result = await this.client.call(request)
        const responses = result.responses
        const errors = result.errors

        if (errors !== null && errors.length === 0) {
            if (this.jwtToken === null) {
                localStorage.setItem("jwt_token", responses[0])
                this.jwtToken = responses[0]
            } else {
                return responses[1]
            }
        } else { // This throws only one exception because method add_order depends on registration
            if(errors[0].code === 1001) {
                throw new PhoneIsNotUniqueError();
            }
            throw new JSONRPCError(errors[0].code, errors[0].message)
        }
    }
}

class PhoneIsNotUniqueError extends Error {
    public code: number;

    constructor() {
        super("Phone is not unique");
        this.code = 1001;

        Object.setPrototypeOf(this, JSONRPCError.prototype);
    }
}

class JSONRPCError extends Error {
    public code: number;

    constructor(code, message) {
        super(message);

        this.code = code;
        Object.setPrototypeOf(this, JSONRPCError.prototype);
    }
}

export default Api;