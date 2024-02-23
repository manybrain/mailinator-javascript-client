import {RequestWithoutToken} from '../RequestWithoutToken';
import {IRestResponse} from 'typed-rest-client/RestClient';
import restClient from '../MailinatorRestClient';
import { Webhook } from './Webhook';
import { WebhookResponseStatus } from './WebhookResponseStatus';

const _resolveTemplateUrl = () => {
    return `https://api.mailinator.com/api/v2/domains/public/webhook/`;
};

export class PublicWebhookRequest implements RequestWithoutToken<WebhookResponseStatus> {

    constructor(private readonly webhook: Webhook) {
    }

    execute(): Promise<IRestResponse<WebhookResponseStatus>> {

        return restClient.create<WebhookResponseStatus>(_resolveTemplateUrl(), this.webhook);
    }
}
