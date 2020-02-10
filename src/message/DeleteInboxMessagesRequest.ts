import {Request} from '../Request';
import {IRequestOptions, IRestResponse} from 'typed-rest-client/RestClient';
import restClient from '../MailinatorRestClient';
import {DeletedMessages} from './DeletedMessages';
import {AUTHORIZATION} from "../Constants";

const _resolveTemplateUrl = (domain: string, inbox: string) => {
    return `https://api.mailinator.com/v2/domains/${domain}/inboxes/${inbox}`;
};

export class DeleteInboxMessagesRequest implements Request<DeletedMessages> {

    constructor(private readonly domain: string,
                private readonly inbox: string) {
    }

    execute(apiToken: string): Promise<IRestResponse<DeletedMessages>> {

        const _options: IRequestOptions = {
            additionalHeaders: {
                [AUTHORIZATION]: apiToken
            }
        };

        return restClient.del<DeletedMessages>(_resolveTemplateUrl(this.domain, this.inbox), _options);
    }

}