import { Request } from '../Request';
import { IRestResponse } from 'typed-rest-client/RestClient';
import { Domain } from "./Domain";
export declare class GetDomainRequest implements Request<Domain> {
    private readonly domain;
    constructor(domain: string);
    execute(apiToken: string): Promise<IRestResponse<Domain>>;
}
