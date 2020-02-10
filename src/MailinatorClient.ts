import {Request} from './Request';
import {IRestResponse} from "typed-rest-client/RestClient";

export class MailinatorClient {

    constructor(private readonly apiToken: string) {
    }

    request<T>(request: Request<T>): Promise<IRestResponse<T>> {
        return request.execute(this.apiToken);
    }
}