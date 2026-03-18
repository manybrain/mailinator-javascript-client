import { Request } from '../Request';
import { IRequestOptions, IRestResponse } from 'typed-rest-client/RestClient';
import restClient from '../MailinatorRestClient';
import { AUTHORIZATION } from '../Constants';
import { MessageHeadersResponse } from './MessageHeadersResponse';

const _resolveTemplateUrl = (domain: string, messageId: string) => {
    return `https://api.mailinator.com/api/v2/domains/${domain}/messages/${messageId}/headers`;
};

export class GetMessageHeadersRequest implements Request<MessageHeadersResponse> {

    constructor(private readonly domain: string,
                private readonly messageId: string) {
    }

    execute(apiToken: string): Promise<IRestResponse<MessageHeadersResponse>> {

        const _options: IRequestOptions = {
            additionalHeaders: {
                [AUTHORIZATION]: apiToken
            }
        };

        return restClient.get<MessageHeadersResponse>(_resolveTemplateUrl(this.domain, this.messageId), _options);
    }
}
