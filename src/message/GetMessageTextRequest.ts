import { Request } from '../Request';
import { MessageTextResponse } from './MessageTextResponse';
import { IRequestOptions, IRestResponse } from 'typed-rest-client/RestClient';
import restClient from '../MailinatorRestClient';
import { AUTHORIZATION } from '../Constants';

const _resolveTemplateUrl = (domain: string, messageId: string) => {
    return `https://api.mailinator.com/api/v2/domains/${domain}/messages/${messageId}/text`;
};

export class GetMessageTextRequest implements Request<MessageTextResponse> {

    constructor(private readonly domain: string,
                private readonly messageId: string) {
    }

    execute(apiToken: string): Promise<IRestResponse<MessageTextResponse>> {

        const _options: IRequestOptions = {
            additionalHeaders: {
                [AUTHORIZATION]: apiToken
            }
        };

        return restClient.get<MessageTextResponse>(_resolveTemplateUrl(this.domain, this.messageId), _options);
    }
}
