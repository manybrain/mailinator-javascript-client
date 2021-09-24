import { Request } from '../Request';
import { Attachments } from "./Attachments";
import { IRestResponse } from 'typed-rest-client/RestClient';
export declare class GetAttachmentsRequest implements Request<Attachments> {
    private readonly domain;
    private readonly inbox;
    private readonly messageId;
    constructor(domain: string, inbox: string, messageId: string);
    execute(apiToken: string): Promise<IRestResponse<Attachments>>;
}
