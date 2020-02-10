import {Request} from '../Request';
import {IRequestOptions, IRestResponse} from 'typed-rest-client/RestClient';
import restClient from '../MailinatorRestClient';
import {AUTHORIZATION} from '../Constants';
import {Domains} from "./Domains";

const _resolveTemplateUrl = () => {
    return `https://api.mailinator.com/v2/domains/`;
};

export class GetDomainsRequest implements Request<Domains> {

    constructor() {
    }

    execute(apiToken: string): Promise<IRestResponse<Domains>> {

        const _options: IRequestOptions = {
            additionalHeaders: {
                [AUTHORIZATION]: apiToken
            }
        };

        return restClient.get<Domains>(_resolveTemplateUrl(), _options);
    }

}