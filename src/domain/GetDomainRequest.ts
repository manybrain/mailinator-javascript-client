import {Request} from '../Request';
import {IRequestOptions, IRestResponse} from 'typed-rest-client/RestClient';
import restClient from '../MailinatorRestClient';
import {AUTHORIZATION} from '../Constants';
import {Domain} from "./Domain";

const _resolveTemplateUrl = (domain: string) => {
    return `https://api.mailinator.com/v2/domains/${domain}`;
};

export class GetDomainRequest implements Request<Domain> {

    constructor(private readonly domain: string) {
    }

    execute(apiToken: string): Promise<IRestResponse<Domain>> {

        const _options: IRequestOptions = {
            additionalHeaders: {
                [AUTHORIZATION]: apiToken
            }
        };

        return restClient.get<Domain>(_resolveTemplateUrl(this.domain), _options);
    }

}