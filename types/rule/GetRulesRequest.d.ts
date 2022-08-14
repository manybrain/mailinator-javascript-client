import { Request } from '../Request';
import { IRestResponse } from 'typed-rest-client/RestClient';
import { Rules } from "./Rules";
export declare class GetRulesRequest implements Request<Rules> {
    private readonly domainId;
    constructor(domainId: string);
    execute(apiToken: string): Promise<IRestResponse<Rules>>;
}
