import { Request } from '../Request';
import { DeletedMessages } from './DeletedMessages';
import { IRestResponse } from 'typed-rest-client/RestClient';
export declare class DeleteDomainMessagesRequest implements Request<DeletedMessages> {
    private readonly domain;
    constructor(domain: string);
    execute(apiToken: string): Promise<IRestResponse<DeletedMessages>>;
}
