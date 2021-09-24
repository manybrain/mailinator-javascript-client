import { Inbox } from './Inbox';
import { Request } from '../Request';
import { IRestResponse } from 'typed-rest-client/RestClient';
export declare class GetSmsInboxRequest implements Request<Inbox> {
    private readonly domain;
    private readonly phoneNumber;
    constructor(domain: string, phoneNumber: string);
    execute(apiToken: string): Promise<IRestResponse<Inbox>>;
}
