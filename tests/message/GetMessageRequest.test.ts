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

});
