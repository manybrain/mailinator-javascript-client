import * as tmp from 'tmp';
import {GetMessageAttachmentRequest} from '../../src/message/GetMessageAttachmentRequest';
import * as fs from "fs";
import {
    ENV_API_TOKEN,
    ENV_ATTACHMENT_ID,
    ENV_DOMAIN_PRIVATE,
    ENV_MESSAGE_WITH_ATTACHMENT_ID,
    getApiToken,
    getAttachmentId,
    getMessageWithAttachmentId,
    getPrivateDomain
} from "../TestEnv";
import {EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf} from "../ConditionalTest";

describe('GetMessageAttachmentRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_DOMAIN_PRIVATE, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_MESSAGE_WITH_ATTACHMENT_ID, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_ATTACHMENT_ID, "[^\\s]+")
        )
    )('testMessageAttachmentRequest', async () => {

        const tmpobj = tmp.fileSync();

        const request = new GetMessageAttachmentRequest(getPrivateDomain(), getMessageWithAttachmentId(), getAttachmentId());
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
