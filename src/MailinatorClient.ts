import {Request} from './Request';
import {IRestResponse} from "typed-rest-client/RestClient";
import { RequestWithoutToken } from './RequestWithoutToken';

export class MailinatorClient {
    private readonly apiToken: string | undefined;
    
    constructor(apiToken?: string) {
        this.apiToken = apiToken;
    }

    request<T>(request: Request<T>): Promise<IRestResponse<T>> {
        if (this.apiToken) {
            return request.execute(this.apiToken);
        } else {
            throw new Error('API token is required for this request.');
        }
    }

    requestWithoutToken<T>(request: RequestWithoutToken<T>): Promise<IRestResponse<T>> {
        return request.execute();
    }
}