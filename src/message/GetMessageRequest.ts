import {Request} from '../Request';
import {Message} from './Message';
import {IRequestOptions, IRestResponse} from 'typed-rest-client/RestClient';
import restClient from '../MailinatorRestClient';
import {AUTHORIZATION} from '../Constants';

const _resolveTemplateUrl = (domain: string, messageId: string) => {
    return `https://api.mailinator.com/v2/domains/${domain}/messages/${messageId}`;
};

export class GetMessageRequest implements Request<Message> {

    constructor(private readonly domain: string,
                private readonly messageId: string,
                private readonly del?: string) {
    }

    execute(apiToken: string): Promise<IRestResponse<Message>> {

        const _options: IRequestOptions = {
            queryParameters: {
                params: {}
            },
            additionalHeaders: {
                [AUTHORIZATION]: apiToken
            }
        };

        if (this.del !== undefined) {
            _options.queryParameters!.params['delete'] = this.del
        }

        return restClient.get<Message>(_resolveTemplateUrl(this.domain, this.messageId), _options);
    }

}