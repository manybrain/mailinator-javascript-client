import {postMessage} from '../TestUtils';
import {
    ENV_API_TOKEN,
    ENV_DOMAIN_PRIVATE,
    ENV_INBOX_TEST,
    getApiToken,
    getInboxTest,
    getPrivateDomain
} from "../TestEnv";
import {EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf} from "../ConditionalTest";
import {GetInboxMessageRawRequest} from "../../src/message/GetInboxMessageRawRequest";

describe('GetInboxMessageRawRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_DOMAIN_PRIVATE, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_INBOX_TEST, "[^\\s]+")
        )
    )('testGetInboxMessageRawRequest', async () => {

        const domain = getPrivateDomain();
        const inbox = getInboxTest();
        const message = await postMessage(domain, inbox);

        const request = new GetInboxMessageRawRequest(domain, inbox, message!.result!.id);
        const response = await request.execute(getApiToken());

        expect(response.statusCode).toBe(200);
        const result = response.result;
        expect(result).toBeTruthy();
        //expect(result?.rawData).toBeTruthy();
    });

});
