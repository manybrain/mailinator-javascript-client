import * as tmp from 'tmp';
import {GetInboxMessageAttachmentRequest} from '../../src/message/GetInboxMessageAttachmentRequest';
import {GetInboxMessageAttachmentsRequest} from '../../src/message/GetInboxMessageAttachmentsRequest';
import * as fs from "fs";
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

const getAttachmentIdFromList = (attachment: Record<string, unknown>) => {
    return (
        attachment['attachment-id'] ||
        attachment['attachmentId'] ||
        attachment['attachment_id'] ||
        attachment['id']
    );
};

describe('GetInboxMessageAttachmentRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_DOMAIN_PRIVATE, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_INBOX_TEST, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_MESSAGE_WITH_ATTACHMENT_ID, "[^\\s]+")
        )
    )('testInboxMessageAttachmentRequest', async () => {

        const tmpobj = tmp.fileSync();

        const attachmentsRequest = new GetInboxMessageAttachmentsRequest(
            getPrivateDomain(),
            getInboxTest(),
            getMessageWithAttachmentId()
        );
        const attachmentsResponse = await attachmentsRequest.execute(getApiToken());
        expect(attachmentsResponse.statusCode).toBe(200);
        const attachments = attachmentsResponse.result?.attachments || [];
        expect(Array.isArray(attachments)).toBe(true);
        expect(attachments.length).toBeGreaterThanOrEqual(1);

        const attachmentId = getAttachmentIdFromList(attachments[0] as unknown as Record<string, unknown>);
        expect(attachmentId).toBeTruthy();

        const request = new GetInboxMessageAttachmentRequest(
            getPrivateDomain(),
            getInboxTest(),
            getMessageWithAttachmentId(),
            attachmentId as number
        );
        const response = await request.execute(getApiToken());

        expect(response).toBeTruthy();
        expect(response.result).toBeTruthy();
        expect(response.result!.statusCode).toBe(200);

        const file = fs.createWriteStream(tmpobj.name);
        file.on('error', (err) => expect(err).toBeFalsy());
        response.result!.pipe(file)
            .on('close', () => {
                try {
                    expect(fs.existsSync(tmpobj.name)).toBeTruthy();
                    const stats = fs.statSync(tmpobj.name);
                    const fileSizeInBytes = stats["size"];
                    expect(fileSizeInBytes).toBeGreaterThan(0);
                } catch (err) {
                    expect(err).toBeFalsy();
                }
            });
    });
});
