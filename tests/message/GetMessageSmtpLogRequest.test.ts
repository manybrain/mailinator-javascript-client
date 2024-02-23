import {postMessage} from '../TestUtils';
import {
    ENV_API_TOKEN,
    ENV_DOMAIN_PRIVATE,
    getApiToken,
    getInboxTest,
    getPrivateDomain
} from "../TestEnv";
import {EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf} from "../ConditionalTest";
import {GetMessageSmtpLogRequest} from "../../src/message/GetMessageSmtpLogRequest";

describe('GetMessageSmtpLogRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_DOMAIN_PRIVATE, "[^\\s]+")
        )
    )('testGetMessageSmtpLogRequest', async () => {

        const domain = getPrivateDomain();
        const inbox = getInboxTest();
        const message = await postMessage(domain, inbox);

        const request = new GetMessageSmtpLogRequest(domain, message!.result!.id);
        const response = await request.execute(getApiToken());

        expect(response.statusCode).toBe(200);
        const result = response.result;
        expect(result).toBeTruthy();
        expect(Array.isArray(result?.log)).toBe(true);
    });

});
