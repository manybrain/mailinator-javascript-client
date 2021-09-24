import { Request } from '../Request';
import { IRestResponse } from 'typed-rest-client/RestClient';
import { RuleToCreate } from "./RuleToCreate";
import { Rule } from "./Rule";
export declare class CreateRuleRequest implements Request<Rule> {
    private readonly domainId;
    private readonly rule;
    constructor(domainId: string, rule: RuleToCreate);
    execute(apiToken: string): Promise<IRestResponse<Rule>>;
}
