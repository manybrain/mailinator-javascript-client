/// <reference types="node" />
import { Request } from '../Request';
import { IRestResponse } from "typed-rest-client/RestClient";
import { IncomingMessage } from "http";
export declare class GetAttachmentRequest implements Request<IncomingMessage> {
    private readonly domain;
    private readonly inbox;
    private readonly messageId;
    private readonly attachmentId;
    constructor(domain: string, inbox: string, messageId: string, attachmentId: number);
    execute(apiToken: string): Promise<IRestResponse<IncomingMessage>>;
}
