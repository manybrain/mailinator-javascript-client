import * as tmp from 'tmp';
import {getFirstAvailableDomain} from './TestUtils';
import {GetDomainRequest} from '../src/domain/GetDomainRequest';
import {
    ENV_API_TOKEN,
    ENV_ATTACHMENT_ID,
    ENV_DOMAIN_PRIVATE,
    ENV_INBOX_TEST,
    ENV_MESSAGE_WITH_ATTACHMENT_ID,
    getApiToken,
    getAttachmentId,
    getInboxTest,
    getMessageWithAttachmentId,
    getPrivateDomain
} from "./TestEnv";
import {EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf} from "./ConditionalTest";
import {MailinatorClient} from "../src/MailinatorClient";
import {GetAttachmentRequest} from "../src/message/GetAttachmentRequest";
import * as fs from "fs";
import {IRestResponse} from "typed-rest-client/RestClient";
import {IncomingMessage} from "http";

describe('MailinatorClient Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+")
        )
    )('testGetDomainRequest', async () => {

        const domain = await getFirstAvailableDomain();

        const mailinatorClient = new MailinatorClient(getApiToken());
        const response = await mailinatorClient.request(new GetDomainRequest(domain.name));

        expect(response.statusCode).toBe(200);
        const result = response.result;
        expect(result).toBeTruthy();
        expect(result!.name).toBeTruthy();
        expect(result!._id).toBeTruthy();
        expect(result!.description).toBeTruthy();
        expect(result!.enabled).toBeTruthy();
        expect(result!.rules).toBeTruthy();
        expect(Array.isArray(result!.rules)).toBe(true);
    });

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_DOMAIN_PRIVATE, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_INBOX_TEST, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_MESSAGE_WITH_ATTACHMENT_ID, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_ATTACHMENT_ID, "[^\\s]+")
        )
    )('testAttachmentRequest', async () => {

        const tmpobj = tmp.fileSync();

        const mailinatorClient: MailinatorClient = new MailinatorClient(getApiToken());
        const response: IRestResponse<IncomingMessage> = await mailinatorClient.request(
            new GetAttachmentRequest(
                getPrivateDomain(),
                getInboxTest(),
                getMessageWithAttachmentId(),
                getAttachmentId())
        );

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
