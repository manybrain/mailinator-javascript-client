import {GetAttachmentsRequest} from '../../src/message/GetAttachmentsRequest';
import {postMessage} from "../TestUtils";
import {
    ENV_API_TOKEN,
    ENV_DOMAIN_PRIVATE,
    ENV_INBOX_TEST,
    ENV_MESSAGE_WITH_ATTACHMENT_ID,
    getApiToken,
    getInboxTest,
    getMessageWithAttachmentId,
    getPrivateDomain
} from "../TestEnv";
import {EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf} from "../ConditionalTest";

describe('GetAttachmentsRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_DOMAIN_PRIVATE, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_INBOX_TEST, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_MESSAGE_WITH_ATTACHMENT_ID, "[^\\s]+")
        )
    )('testAttachmentsRequest', async () => {

        const request = new GetAttachmentsRequest(getPrivateDomain(), getInboxTest(), getMessageWithAttachmentId());
        const response = await request.execute(getApiToken());

        expect(response.statusCode).toBe(200);
        const result = response.result;
        expect(result).toBeTruthy();
        expect(result!.attachments).toBeTruthy();
        const attachments = result!.attachments;
        expect(Array.isArray(attachments)).toBe(true);
        expect(attachments.length).toBeGreaterThanOrEqual(1);
        const attachment = attachments[0];
        expect(attachment).toBeTruthy();
        expect(attachment.filename).toBeTruthy();
        expect(attachment['attachment-id']).toBeDefined();
        expect(attachment['content-disposition']).toBeTruthy();
        expect(attachment['content-transfer-encoding']).toBeTruthy();
        expect(attachment['content-type']).toBeTruthy();
    });

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_DOMAIN_PRIVATE, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_INBOX_TEST, "[^\\s]+")
        )
    )('testAttachmentsMissingRequest', async () => {

        const domain = getPrivateDomain();
        const inbox = getInboxTest();
        const message = await postMessage(domain, inbox);

        const request = new GetAttachmentsRequest(domain, inbox, message!.result!.id);
        const response = await request.execute(getApiToken());

        expect(response.statusCode).toBe(200);
        const result = response.result;
        expect(result).toBeTruthy();
        expect(result!.attachments).toBeTruthy();
        const attachments = result!.attachments;
        expect(Array.isArray(attachments)).toBe(true);
        expect(attachments.length).toBe(0);
    });

});
