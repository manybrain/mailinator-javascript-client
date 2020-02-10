import {postMessage} from '../TestUtils';
import {EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf} from "../ConditionalTest";
import {ENV_API_TOKEN, ENV_DOMAIN_PRIVATE, ENV_INBOX_TEST, getInboxTest, getPrivateDomain} from "../TestEnv";

describe('PostMessageRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_DOMAIN_PRIVATE, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_INBOX_TEST, "[^\\s]+")
        )
    )('testPostMessageRequest', async () => {

        const response = await postMessage(getPrivateDomain(), getInboxTest());
        expect(response.statusCode).toBe(200);
        const result = response.result;
        expect(result).toBeTruthy();
        expect(result!.id).toBeTruthy();
        expect(Array.isArray(result!.rules_fired)).toBe(true);
        expect(result!.status).toBe('ok');
    });

});
