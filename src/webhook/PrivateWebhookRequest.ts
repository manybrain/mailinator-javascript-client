import {RequestWithoutToken} from '../RequestWithoutToken';
import {IRestResponse} from 'typed-rest-client/RestClient';
import restClient from '../MailinatorRestClient';
import { Webhook } from './Webhook';
import { WebhookResponseStatus } from './WebhookResponseStatus';

const _resolveTemplateUrl = (whToken: string) => {
    return `https://api.mailinator.com/api/v2/domains/private/webhook?whtoken=${whToken}`;
};

export class PrivateWebhookRequest implements RequestWithoutToken<WebhookResponseStatus> {

    constructor(private readonly whToken: string,
                private readonly webhook: Webhook) {
    }

    execute(): Promise<IRestResponse<WebhookResponseStatus>> {

        return restClient.create<WebhookResponseStatus>(_resolveTemplateUrl(this.whToken), this.webhook);
    }
}
