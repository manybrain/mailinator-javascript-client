import { Request } from '../Request';
import { IRestResponse } from 'typed-rest-client/RestClient';
import { Links } from "./Links";
export declare class GetLinksRequest implements Request<Links> {
    private readonly domain;
    private readonly inbox;
    private readonly messageId;
    constructor(domain: string, inbox: string, messageId: string);
    execute(apiToken: string): Promise<IRestResponse<Links>>;
}
