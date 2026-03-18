import { GetStreamDomainMessagesRequest } from '../../src/message';
import { IRestResponse } from 'typed-rest-client/RestClient';
import { Inbox } from '../../src/message/Inbox';
import {
    ENV_API_TOKEN,
    ENV_DOMAIN_PRIVATE,
    ENV_INBOX_TEST,
    getApiToken,
    getPrivateDomain
} from "../TestEnv";
import { EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf } from "../ConditionalTest";

describe('GetStreamDomainMessagesRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_DOMAIN_PRIVATE, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_INBOX_TEST, "[^\\s]+")
        )
    )('testStreamDomainMessagesRequest', async () => {

        const request: GetStreamDomainMessagesRequest = new GetStreamDomainMessagesRequest(getPrivateDomain());

        console.log("Waiting up to 60 seconds for a live email to be sent...");
        const response: IRestResponse<Inbox> = await request.execute(getApiToken());

        expect(response.statusCode).toBe(200);
        const result = response.result as any; // Cast to any to check domain if available
        expect(result).toBeTruthy();

        // Assert the returned object specifically has a 'to' property and a 'msgs' property
        expect(result).toHaveProperty('to');
        expect(result).toHaveProperty('msgs');
        expect(Array.isArray(result.msgs)).toBe(true);

        if (result.domain) {
            expect(result.domain).toBe(getPrivateDomain());
        }
    }, 60000);

});
