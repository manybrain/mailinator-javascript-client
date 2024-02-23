import {Inbox} from './Inbox';
import {Request} from '../Request';
import {IRequestOptions, IRestResponse} from 'typed-rest-client/RestClient';
import restClient from '../MailinatorRestClient';
import {AUTHORIZATION} from '../Constants';

const _resolveTemplateUrl = (domain: string) => {
    return `https://api.mailinator.com/v2/domains/${domain}/messages/*`;
};

export class GetLatestMessagesRequest implements Request<Inbox> {

    constructor(private readonly domain: string) {
    }

    execute(apiToken: string): Promise<IRestResponse<Inbox>> {

        const _options: IRequestOptions = {
            additionalHeaders: {
                [AUTHORIZATION]: apiToken
            }
        };

        return restClient.get<Inbox>(_resolveTemplateUrl(this.domain), _options);
    }
}