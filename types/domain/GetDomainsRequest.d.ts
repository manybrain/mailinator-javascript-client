import { Request } from '../Request';
import { IRestResponse } from 'typed-rest-client/RestClient';
import { Domains } from "./Domains";
export declare class GetDomainsRequest implements Request<Domains> {
    constructor();
    execute(apiToken: string): Promise<IRestResponse<Domains>>;
}
