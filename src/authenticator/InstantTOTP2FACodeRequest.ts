import {Request} from '../Request';
import {IRequestOptions, IRestResponse} from 'typed-rest-client/RestClient';
import restClient from '../MailinatorRestClient';
import {AUTHORIZATION} from '../Constants';
import { InstantTOTP2FACode } from './InstantTOTP2FACode';

const _resolveTemplateUrl = (totpSecretKey: string) => {
    return `https://api.mailinator.com/v2/totp/${totpSecretKey}`;
};

export class InstantTOTP2FACodeRequest implements Request<InstantTOTP2FACode> {

    constructor(private readonly totpSecretKey: string) {
    }

    execute(apiToken: string): Promise<IRestResponse<InstantTOTP2FACode>> {

        const _options: IRequestOptions = {
            additionalHeaders: {
                [AUTHORIZATION]: apiToken
            }
        };

        return restClient.get<InstantTOTP2FACode>(_resolveTemplateUrl(this.totpSecretKey), _options);
    }

}