import {Request} from '../Request';
import {AUTHORIZATION} from '../Constants'
import {Attachments} from "./Attachments";
import {IRequestOptions, IRestResponse} from 'typed-rest-client/RestClient';
import restClient from '../MailinatorRestClient';

const _resolveTemplateUrl = (domain: string, inbox: string, messageId: string) => {
    return `https://api.mailinator.com/v2/domains/${domain}/inboxes/${inbox}/messages/${messageId}/attachments`;
};

export class GetAttachmentsRequest implements Request<Attachments> {

    constructor(private readonly domain: string,
                private readonly inbox: string,
                private readonly messageId: string) {
    }

    execute(apiToken: string): Promise<IRestResponse<Attachments>> {

        const _options: IRequestOptions = {
            additionalHeaders: {
                [AUTHORIZATION]: apiToken
            }
        };

        return restClient.get<Attachments>(_resolveTemplateUrl(this.domain, this.inbox, this.messageId), _options);
    }

}