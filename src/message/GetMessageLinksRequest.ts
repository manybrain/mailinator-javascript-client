import {Request} from '../Request';
import {IRequestOptions, IRestResponse} from 'typed-rest-client/RestClient';
import restClient from '../MailinatorRestClient';
import {AUTHORIZATION} from '../Constants';
import {Links} from "./Links";

const _resolveTemplateUrl = (domain: string, messageId: string) => {
    return `https://api.mailinator.com/v2/domains/${domain}/messages/${messageId}/links`;
};

export class GetMessageLinksRequest implements Request<Links> {

    constructor(private readonly domain: string,
                private readonly messageId: string) {
    }

    execute(apiToken: string): Promise<IRestResponse<Links>> {

        const _options: IRequestOptions = {
            additionalHeaders: {
                [AUTHORIZATION]: apiToken
            }
        };

        return restClient.get<Links>(_resolveTemplateUrl(this.domain, this.messageId), _options);
    }

}
