import {Inbox} from './Inbox';
import {Request} from '../Request';
import {IRequestOptions, IRestResponse} from 'typed-rest-client/RestClient';
import restClient from '../MailinatorRestClient';
import {AUTHORIZATION} from '../Constants';

const _resolveTemplateUrl = (domain: string, inbox: string | undefined) => {
    if (inbox === undefined) {
        inbox = '';
    }
    return `https://api.mailinator.com/api/v2/domains/${domain}/inboxes/${inbox}/messages/*`;
};

/** @deprecated This endpoint is not in the OpenAPI spec and currently returns server errors. It will be removed in a future release. */
export class GetLatestInboxMessagesRequest implements Request<Inbox> {

    constructor(private readonly domain: string,
                private readonly inbox?: string) {
    }

    execute(apiToken: string): Promise<IRestResponse<Inbox>> {

        const _options: IRequestOptions = {
            additionalHeaders: {
                [AUTHORIZATION]: apiToken
            }
        };

        return restClient.get<Inbox>(_resolveTemplateUrl(this.domain, this.inbox), _options);
    }
}
