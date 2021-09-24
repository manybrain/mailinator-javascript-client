import { Inbox } from './Inbox';
import { Sort } from './Sort';
import { Request } from '../Request';
import { IRestResponse } from 'typed-rest-client/RestClient';
export declare class GetInboxRequest implements Request<Inbox> {
    private readonly domain;
    private readonly inbox?;
    private readonly skip?;
    private readonly limit?;
    private readonly sort?;
    private readonly decodeSubject?;
    constructor(domain: string, inbox?: string | undefined, skip?: number | undefined, limit?: number | undefined, sort?: Sort | undefined, decodeSubject?: boolean | undefined);
    execute(apiToken: string): Promise<IRestResponse<Inbox>>;
}
