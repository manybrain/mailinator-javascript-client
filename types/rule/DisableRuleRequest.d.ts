import { Request } from '../Request';
import { IRestResponse } from 'typed-rest-client/RestClient';
import { ResponseStatus } from "./ResponseStatus";
export declare class DisableRuleRequest implements Request<ResponseStatus> {
    private readonly domainId;
    private readonly ruleId;
    constructor(domainId: string, ruleId: string);
    execute(apiToken: string): Promise<IRestResponse<ResponseStatus>>;
}
