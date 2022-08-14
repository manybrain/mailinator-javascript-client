import { Request } from '../Request';
import { IRestResponse } from 'typed-rest-client/RestClient';
import { DeletedMessages } from './DeletedMessages';
export declare class DeleteInboxMessagesRequest implements Request<DeletedMessages> {
    private readonly domain;
    private readonly inbox;
    constructor(domain: string, inbox: string);
    execute(apiToken: string): Promise<IRestResponse<DeletedMessages>>;
}
