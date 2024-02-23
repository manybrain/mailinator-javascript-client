import {RequestWithoutToken} from '../RequestWithoutToken';
import {IRestResponse} from 'typed-rest-client/RestClient';
import restClient from '../MailinatorRestClient';
import { Webhook } from './Webhook';
import { CustomServiceWebhookResponseStatus } from './CustomServiceWebhookResponseStatus';

const _resolveTemplateUrl = (customService: string) => {
    return `https://api.mailinator.com/api/v2/domains/public/${customService}`;
};

export class PublicCustomServiceWebhookRequest implements RequestWithoutToken<CustomServiceWebhookResponseStatus> {

    constructor(private readonly customService: string,
                private readonly webhook: Webhook) {
    }

    execute(): Promise<IRestResponse<CustomServiceWebhookResponseStatus>> {

        return restClient.create<CustomServiceWebhookResponseStatus>(_resolveTemplateUrl(this.customService), this.webhook);
    }
}
