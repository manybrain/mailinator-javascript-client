import { Request } from '../Request';
import { IRestResponse } from 'typed-rest-client/RestClient';
import { DeletedMessages } from './DeletedMessages';
export declare class DeleteMessageRequest implements Request<DeletedMessages> {
    private readonly domain;
    private readonly inbox;
    private readonly messageId;
    constructor(domain: string, inbox: string, messageId: string);
    execute(apiToken: string): Promise<IRestResponse<DeletedMessages>>;
}
