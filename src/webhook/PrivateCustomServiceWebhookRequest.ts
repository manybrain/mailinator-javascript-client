import {RequestWithoutToken} from '../RequestWithoutToken';
import {IRestResponse} from 'typed-rest-client/RestClient';
import restClient from '../MailinatorRestClient';
import { Webhook } from './Webhook';
import { CustomServiceWebhookResponseStatus } from './CustomServiceWebhookResponseStatus';

const _resolveTemplateUrl = (whToken: string, customService: string) => {
    return `https://api.mailinator.com/api/v2/domains/${whToken}/${customService}`;
};

export class PrivateCustomServiceWebhookRequest implements RequestWithoutToken<CustomServiceWebhookResponseStatus> {

    constructor(private readonly whToken: string,
                private readonly customService: string,
                private readonly webhook: Webhook) {
    }

    execute(): Promise<IRestResponse<CustomServiceWebhookResponseStatus>> {

        return restClient.create<CustomServiceWebhookResponseStatus>(_resolveTemplateUrl(this.whToken, this.customService), this.webhook);
    }
}
