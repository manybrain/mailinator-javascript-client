import {Request} from '../Request';
import {IRequestOptions, IRestResponse} from 'typed-rest-client/RestClient';
import restClient from '../MailinatorRestClient';
import {AUTHORIZATION} from '../Constants';
import { Authenticator } from './Authenticator';

const _resolveTemplateUrl = (authId: string) => {
    return `https://api.mailinator.com/v2/authenticator/${authId}`;
};

export class GetAuthenticatorByIdRequest implements Request<Authenticator> {

    constructor(private readonly authId: string) {
    }

    execute(apiToken: string): Promise<IRestResponse<Authenticator>> {

        const _options: IRequestOptions = {
            additionalHeaders: {
                [AUTHORIZATION]: apiToken
            }
        };

        return restClient.get<Authenticator>(_resolveTemplateUrl(this.authId), _options);
    }

}