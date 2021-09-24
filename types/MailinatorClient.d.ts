import { Request } from './Request';
import { IRestResponse } from "typed-rest-client/RestClient";
export declare class MailinatorClient {
    private readonly apiToken;
    constructor(apiToken: string);
    request<T>(request: Request<T>): Promise<IRestResponse<T>>;
}
