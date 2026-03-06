import {v4 as uuid} from 'uuid';
import {postMessage} from '../TestUtils';
import {GetMessageRequest} from '../../src/message/GetMessageRequest';
import {
    ENV_API_TOKEN,
    ENV_DOMAIN_PRIVATE,
    ENV_INBOX_TEST,
    getApiToken,
    getInboxTest,
    getPrivateDomain
} from "../TestEnv";
import {EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf} from "../ConditionalTest";

describe('GetMessageRequest Tests', function () {
    let messageIdWithDeleteDelay: string | undefined;

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_DOMAIN_PRIVATE, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_INBOX_TEST, "[^\\s]+")
        )
    )('testMessageRequest', async () => {

        const domain = getPrivateDomain();
        const inbox = getInboxTest();
        const message = await postMessage(domain, inbox);

        const request = new GetMessageRequest(domain, message!.result!.id);
        const response = await request.execute(getApiToken());

        expect(response.statusCode).toBe(200);
        const result = response.result;
        expect(result).toBeTruthy();
        expect(result!.to).toBe(getInboxTest());
        expect(result!.domain).toBe(getPrivateDomain());
        expect(result!.mrid).toBe(message!.result!.id);
    });

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_DOMAIN_PRIVATE, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_INBOX_TEST, "[^\\s]+")
        )
    )('testInboxMessageRequestWhenMessageDoesNotExist', async () => {

        const random: string = uuid();
        const request = new GetMessageRequest(getPrivateDomain(), random);
        await expect(request.execute(getApiToken())).rejects.toThrow()
    });

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_DOMAIN_PRIVATE, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_INBOX_TEST, "[^\\s]+")
        )
    )('testGetMessageWithDeleteRequest', async () => {

        const domain = getPrivateDomain();
        const inbox = getInboxTest();
        const message = await postMessage(domain, inbox);

        const request = new GetMessageRequest(domain, message!.result!.id, "1s");
        const response = await request.execute(getApiToken());

        expect(response.statusCode).toBe(200);
        const result = response.result;
        expect(result).toBeTruthy();
        expect(result!.mrid).toBe(message!.result!.id);

        messageIdWithDeleteDelay = message!.result!.id;
    });

    //(skipped: backend delete timing is delayed/non-deterministic)
    it.skip('testGetMessageAfterDeleteDelay', async () => {

        const domain = getPrivateDomain();
        if (messageIdWithDeleteDelay === undefined) {
            throw new Error('Missing message id from testGetMessageWithDeleteRequest');
        }

        await new Promise(resolve => setTimeout(resolve, 20000));

        const request2 = new GetMessageRequest(domain, messageIdWithDeleteDelay);
        await expect(request2.execute(getApiToken())).rejects.toThrow()
    }, 30000);

});
