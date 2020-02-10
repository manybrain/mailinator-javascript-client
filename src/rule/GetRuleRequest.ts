import {Request} from '../Request';
import {IRequestOptions, IRestResponse} from 'typed-rest-client/RestClient';
import restClient from '../MailinatorRestClient';
import {AUTHORIZATION} from '../Constants';
import {Rule} from "./Rule";

const _resolveTemplateUrl = (domainId: string, ruleId: string) => {
    return `https://api.mailinator.com/v2/domains/${domainId}/rules/${ruleId}`;
};

export class GetRuleRequest implements Request<Rule> {

    constructor(private readonly domainId: string,
                private readonly ruleId: string) {
    }

    execute(apiToken: string): Promise<IRestResponse<Rule>> {

        const _options: IRequestOptions = {
            additionalHeaders: {
                [AUTHORIZATION]: apiToken
            }
        };

        return restClient.get<Rule>(_resolveTemplateUrl(this.domainId, this.ruleId), _options);
    }

}