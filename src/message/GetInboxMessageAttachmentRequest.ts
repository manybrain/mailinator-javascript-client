import {Request} from '../Request';
import httpClient from '../MailinatorHttpClient';
import {AUTHORIZATION} from '../Constants'
import {IHeaders, IHttpClientResponse} from "typed-rest-client/Interfaces";
import {IRestResponse} from "typed-rest-client/RestClient";
import {IncomingMessage} from "http";

const _resolveTemplateUrl = (domain: string, inbox: string, messageId: string, attachmentId: number) => {
    return `https://api.mailinator.com/v2/domains/${domain}/inboxes/${inbox}/messages/${messageId}/attachments/${attachmentId}`;
};

export class GetInboxMessageAttachmentRequest implements Request<IncomingMessage> {

    constructor(private readonly domain: string,
                private readonly inbox: string,
                private readonly messageId: string,
                private readonly attachmentId: number) {
    }

    execute(apiToken: string): Promise<IRestResponse<IncomingMessage>> {

        const _headers: IHeaders = {
            [AUTHORIZATION]: apiToken
        };

        return httpClient.get(_resolveTemplateUrl(this.domain, this.inbox, this.messageId, this.attachmentId), _headers)
            .then((res: IHttpClientResponse) => {
                    // workaround to keep the API consistent
                    return Promise.resolve({
                        statusCode: res.message.statusCode || 200,
                        result: res.message,
                        headers: res.message.headers
                    });
                }
            );
    }

}