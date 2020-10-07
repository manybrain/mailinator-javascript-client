import {Request} from '../Request';
import {IRequestOptions, IRestResponse} from 'typed-rest-client/RestClient';
import restClient from '../MailinatorRestClient';
import {AUTHORIZATION} from '../Constants';
import {Rules} from "./Rules";

const _resolveTemplateUrl = (domainId: string) => {
    return `https://api.mailinator.com/api/v2/domains/${domainId}/rules/`;
};

export class GetRulesRequest implements Request<Rules> {

    constructor(private readonly domainId: string) {
    }

    execute(apiToken: string): Promise<IRestResponse<Rules>> {

        const _options: IRequestOptions = {
            additionalHeaders: {
                [AUTHORIZATION]: apiToken
            }
        };

        return restClient.get<Rules>(_resolveTemplateUrl(this.domainId), _options);
    }

}
