import {GetStreamInboxMessagesRequest} from '../../src/message';
import {IRestResponse} from 'typed-rest-client/RestClient';
import {Inbox} from '../../src/message/Inbox';
import {
    ENV_API_TOKEN,
    ENV_DOMAIN_PRIVATE,
    ENV_INBOX_TEST,
    getApiToken,
    getPrivateDomain,
    getInboxTest
} from "../TestEnv";
import {EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf} from "../ConditionalTest";

describe('GetStreamInboxMessagesRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_DOMAIN_PRIVATE, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_INBOX_TEST, "[^\\s]+")
        )
    )('testStreamInboxMessagesRequest', async () => {

        const request: GetStreamInboxMessagesRequest = new GetStreamInboxMessagesRequest(getPrivateDomain(), getInboxTest());
        
        console.log(`Waiting up to 60 seconds for a live email to be sent to ${getInboxTest()}@${getPrivateDomain()}...`);
        const response: IRestResponse<Inbox> = await request.execute(getApiToken());

        expect(response.statusCode).toBe(200);
        const result = response.result as any; 
        expect(result).toBeTruthy();
        
        expect(result).toHaveProperty('to');
        expect(result).toHaveProperty('msgs');
        expect(result.to).toBe(getInboxTest());
        expect(Array.isArray(result.msgs)).toBe(true);
        
        if (result.domain) {
            expect(result.domain).toBe(getPrivateDomain());
        }
    }, 60000);

});
