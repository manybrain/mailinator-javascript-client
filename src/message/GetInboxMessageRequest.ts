import {Request} from '../Request';
import {Message} from './Message';
import {IRequestOptions, IRestResponse} from 'typed-rest-client/RestClient';
import restClient from '../MailinatorRestClient';
import {AUTHORIZATION} from '../Constants';

const _resolveTemplateUrl = (domain: string, inbox: string, messageId: string) => {
    return `https://api.mailinator.com/v2/domains/${domain}/inboxes/${inbox}/messages/${messageId}`;
};

export class GetInboxMessageRequest implements Request<Message> {

    constructor(private readonly domain: string,
                private readonly inbox: string,
                private readonly messageId: string) {
    }

    execute(apiToken: string): Promise<IRestResponse<Message>> {

        const _options: IRequestOptions = {
            additionalHeaders: {
                [AUTHORIZATION]: apiToken
            }
        };

        return restClient.get<Message>(_resolveTemplateUrl(this.domain, this.inbox, this.messageId), _options);
    }

}