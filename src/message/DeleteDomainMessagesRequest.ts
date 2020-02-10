import {Request} from '../Request';
import {DeletedMessages} from './DeletedMessages';
import {IRequestOptions, IRestResponse} from 'typed-rest-client/RestClient';
import restClient from '../MailinatorRestClient';
import {AUTHORIZATION} from "../Constants";

const _resolveTemplateUrl = (domain: string) => {
    return `https://api.mailinator.com/v2/domains/${domain}/inboxes/`;
};

export class DeleteDomainMessagesRequest implements Request<DeletedMessages> {

    constructor(private readonly domain: string) {
    }

    execute(apiToken: string): Promise<IRestResponse<DeletedMessages>> {

        const _options: IRequestOptions = {
            additionalHeaders: {
                [AUTHORIZATION]: apiToken
            }
        };

        return restClient.del<DeletedMessages>(_resolveTemplateUrl(this.domain), _options);
    }

}