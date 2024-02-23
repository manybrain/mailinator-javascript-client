import {Request} from '../Request';
import {IRequestOptions, IRestResponse} from 'typed-rest-client/RestClient';
import restClient from '../MailinatorRestClient';
import {AUTHORIZATION} from '../Constants';
import { Authenticators } from './Authenticators';

const _resolveTemplateUrl = () => {
    return `https://api.mailinator.com/v2/authenticators/`;
};

export class GetAuthenticatorsRequest implements Request<Authenticators> {

    constructor() {
    }

    execute(apiToken: string): Promise<IRestResponse<Authenticators>> {

        const _options: IRequestOptions = {
            additionalHeaders: {
                [AUTHORIZATION]: apiToken
            }
        };

        return restClient.get<Authenticators>(_resolveTemplateUrl(), _options);
    }

}