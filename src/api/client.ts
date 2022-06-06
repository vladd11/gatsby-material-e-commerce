export class JSONRPCClient {
    private functionURL: string;

    constructor(functionURL: string) {
        this.functionURL = `${functionURL}/v1`;
    }

    async call(request: any): Promise<any> {
        const responseJSON = await (
            await fetch(this.functionURL,
                {
                    method: "POST",
                    body: JSON.stringify(request)
                })
        ).json()

        const errors: Array<JSONRPCError> = []
        const responses: Array<any> = []

        for (const response of responseJSON) {
            if (response.error) {
                errors.push(response.error)
            } else {
                responses.push(response.result)
            }
        }

        return {responses: responses, errors: errors}
    }
}

export interface JSONRPCError {
    code: number,
    message: string
}

export interface JSONRPCRequest {
    jsonrpc: string,
    id: any,
    method: string,
    params: any
}
