import {Request} from '../Request';
import {IRequestOptions, IRestResponse} from 'typed-rest-client/RestClient';
import restClient from '../MailinatorRestClient';
import {AUTHORIZATION} from "../Constants";
import {RuleToCreate} from "./RuleToCreate";
import {Rule} from "./Rule";

const _resolveTemplateUrl = (domainId: string) => {
    return `https://api.mailinator.com/v2/domains/${domainId}/rules/`;
};

export class CreateRuleRequest implements Request<Rule> {

    constructor(private readonly domainId: string,
                private readonly rule: RuleToCreate) {
    }

    execute(apiToken: string): Promise<IRestResponse<Rule>> {

        const _options: IRequestOptions = {
            additionalHeaders: {
                [AUTHORIZATION]: apiToken
            }
        };

        return restClient.create<Rule>(_resolveTemplateUrl(this.domainId), this.rule, _options);
    }
}