import {RequestWithoutToken} from '../RequestWithoutToken';
import {IRestResponse} from 'typed-rest-client/RestClient';
import restClient from '../MailinatorRestClient';
import { Webhook } from './Webhook';
import { WebhookResponseStatus } from './WebhookResponseStatus';

const _resolveTemplateUrl = (whToken: string, inbox: string) => {
    return `https://api.mailinator.com/api/v2/domains/${whToken}/webhook/${inbox}`;
};

export class PrivateInboxWebhookRequest implements RequestWithoutToken<WebhookResponseStatus> {

    constructor(private readonly whToken: string,
                private readonly inbox: string,
                private readonly webhook: Webhook) {
    }

    execute(): Promise<IRestResponse<WebhookResponseStatus>> {

        return restClient.create<WebhookResponseStatus>(_resolveTemplateUrl(this.whToken, this.inbox), this.webhook);
    }
}
