import {Request} from '../Request';
import {IRequestOptions, IRestResponse} from 'typed-rest-client/RestClient';
import restClient from '../MailinatorRestClient';
import {AUTHORIZATION} from '../Constants';
import {Links} from "./Links";

const _resolveTemplateUrl = (domain: string, inbox: string, messageId: string) => {
    return `https://api.mailinator.com/v2/domains/${domain}/inboxes/${inbox}/messages/${messageId}/links`;
};

export class GetInboxMessageLinksRequest implements Request<Links> {

    constructor(private readonly domain: string,
                private readonly inbox: string,
                private readonly messageId: string) {
    }

    execute(apiToken: string): Promise<IRestResponse<Links>> {

        const _options: IRequestOptions = {
            additionalHeaders: {
                [AUTHORIZATION]: apiToken
            }
        };

        return restClient.get<Links>(_resolveTemplateUrl(this.domain, this.inbox, this.messageId), _options);
    }

}
