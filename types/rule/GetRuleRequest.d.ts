import { Request } from '../Request';
import { IRestResponse } from 'typed-rest-client/RestClient';
import { Rule } from "./Rule";
export declare class GetRuleRequest implements Request<Rule> {
    private readonly domainId;
    private readonly ruleId;
    constructor(domainId: string, ruleId: string);
    execute(apiToken: string): Promise<IRestResponse<Rule>>;
}
