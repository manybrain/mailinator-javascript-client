import {Request} from '../Request';
import {AUTHORIZATION} from '../Constants'
import {Attachments} from "./Attachments";
import {IRequestOptions, IRestResponse} from 'typed-rest-client/RestClient';
import restClient from '../MailinatorRestClient';

const _resolveTemplateUrl = (domain: string, messageId: string) => {
    return `https://api.mailinator.com/v2/domains/${domain}/messages/${messageId}/attachments`;
};

export class GetMessageAttachmentsRequest implements Request<Attachments> {

    constructor(private readonly domain: string,
                private readonly messageId: string) {
    }

    execute(apiToken: string): Promise<IRestResponse<Attachments>> {

        const _options: IRequestOptions = {
            additionalHeaders: {
                [AUTHORIZATION]: apiToken
            }
        };

        return restClient.get<Attachments>(_resolveTemplateUrl(this.domain, this.messageId), _options);
    }

}