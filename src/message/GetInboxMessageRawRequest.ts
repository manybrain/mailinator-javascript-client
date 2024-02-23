import {Request} from '../Request';
import {IRequestOptions, IRestResponse} from 'typed-rest-client/RestClient';
import restClient from '../MailinatorRestClient';
import {AUTHORIZATION} from '../Constants';
import { RawData } from './RawData';

const _resolveTemplateUrl = (domain: string, inbox: string, messageId: string) => {
    return `https://api.mailinator.com/v2/domains/${domain}/inboxes/${inbox}/messages/${messageId}/raw`;
};

export class GetInboxMessageRawRequest implements Request<string> {

    constructor(private readonly domain: string,
                private readonly inbox: string,
                private readonly messageId: string) {
    }

    execute(apiToken: string): Promise<IRestResponse<string>> {

        const _options: IRequestOptions = {
            additionalHeaders: {
                [AUTHORIZATION]: apiToken
            }
        };

        return restClient.get<string>(_resolveTemplateUrl(this.domain, this.inbox, this.messageId), _options);
    }
}