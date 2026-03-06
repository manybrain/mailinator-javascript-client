import { Request } from '../Request';
import { MessageSummaryResponse } from './MessageSummaryResponse';
import { IRequestOptions, IRestResponse } from 'typed-rest-client/RestClient';
import restClient from '../MailinatorRestClient';
import { AUTHORIZATION } from '../Constants';

const _resolveTemplateUrl = (domain: string, messageId: string) => {
    return `https://api.mailinator.com/api/v2/domains/${domain}/messages/${messageId}/summary`;
};

export class GetMessageSummaryRequest implements Request<MessageSummaryResponse> {

    constructor(private readonly domain: string,
                private readonly messageId: string) {
    }

    execute(apiToken: string): Promise<IRestResponse<MessageSummaryResponse>> {

        const _options: IRequestOptions = {
            additionalHeaders: {
                [AUTHORIZATION]: apiToken
            }
        };

        return restClient.get<MessageSummaryResponse>(_resolveTemplateUrl(this.domain, this.messageId), _options);
    }
}
