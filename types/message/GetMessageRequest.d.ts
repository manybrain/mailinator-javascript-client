import { Request } from '../Request';
import { Message } from './Message';
import { IRestResponse } from 'typed-rest-client/RestClient';
export declare class GetMessageRequest implements Request<Message> {
    private readonly domain;
    private readonly inbox;
    private readonly messageId;
    constructor(domain: string, inbox: string, messageId: string);
    execute(apiToken: string): Promise<IRestResponse<Message>>;
}
