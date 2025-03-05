import {Request} from '../Request';
import {IRequestOptions, IRestResponse} from 'typed-rest-client/RestClient';
import restClient from '../MailinatorRestClient';
import {AUTHORIZATION} from '../Constants';
import { LinksFull } from './LinksFull';

const _resolveTemplateUrl = (domain: string, messageId: string) => {
    return `https://api.mailinator.com/v2/domains/${domain}/messages/${messageId}/linksfull`;
};

export class GetMessageLinksFullRequest implements Request<LinksFull> {

    constructor(private readonly domain: string,
                private readonly messageId: string) {
    }

    execute(apiToken: string): Promise<IRestResponse<LinksFull>> {

        const _options: IRequestOptions = {
            additionalHeaders: {
                [AUTHORIZATION]: apiToken
            }
        };

        return restClient.get<LinksFull>(_resolveTemplateUrl(this.domain, this.messageId), _options);
    }

}
