import {Request} from '../Request';
import {IRequestOptions, IRestResponse} from 'typed-rest-client/RestClient';
import restClient from '../MailinatorRestClient';
import {AUTHORIZATION} from "../Constants";
import {ResponseStatus} from "./ResponseStatus";

const _resolveTemplateUrl = (domainId: string, ruleId: string) => {
    return `https://api.mailinator.com/api/v2/domains/${domainId}/rules/${ruleId}/disable`;
};

export class DisableRuleRequest implements Request<ResponseStatus> {

    constructor(private readonly domainId: string,
                private readonly ruleId: string) {
    }

    execute(apiToken: string): Promise<IRestResponse<ResponseStatus>> {

        const _options: IRequestOptions = {
            additionalHeaders: {
                [AUTHORIZATION]: apiToken
            }
        };

        return restClient.replace<ResponseStatus>(_resolveTemplateUrl(this.domainId, this.ruleId), {}, _options);
    }
}
