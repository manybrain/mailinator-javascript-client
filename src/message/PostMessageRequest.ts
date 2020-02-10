import {Request} from '../Request';
import {IRequestOptions, IRestResponse} from 'typed-rest-client/RestClient';
import restClient from '../MailinatorRestClient';
import {MessageToPost} from './MessageToPost';
import {PostedMessage} from './PostedMessage';
import {AUTHORIZATION} from "../Constants";

const _resolveTemplateUrl = (domain: string, inbox: string) => {
    return `https://api.mailinator.com/v2/domains/${domain}/inboxes/${inbox}/messages`;
};

export class PostMessageRequest implements Request<PostedMessage> {

    constructor(private readonly domain: string,
                private readonly inbox: string,
                private readonly message: MessageToPost) {
    }

    execute(apiToken: string): Promise<IRestResponse<PostedMessage>> {

        const _options: IRequestOptions = {
            additionalHeaders: {
                [AUTHORIZATION]: apiToken
            }
        };

        return restClient.create<PostedMessage>(_resolveTemplateUrl(this.domain, this.inbox), this.message, _options);
    }
}