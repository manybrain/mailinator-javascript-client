import {GetLatestInboxMessagesRequest} from '../../src/message/GetLatestInboxMessagesRequest';
import {IRestResponse} from 'typed-rest-client/RestClient';
import {Inbox} from '../../src/message/Inbox';
import {
    ENV_API_TOKEN,
    ENV_DOMAIN_PRIVATE,
    ENV_INBOX_TEST,
    getApiToken,
    getInboxTest,
    getPrivateDomain
} from "../TestEnv";
import {EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf} from "../ConditionalTest";

describe('GetLatestInboxMessagesRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_DOMAIN_PRIVATE, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_INBOX_TEST, "[^\\s]+")
        )
    )('testInboxRequestWithPrivateDomainAndInbox', async () => {

        const request: GetLatestInboxMessagesRequest = new GetLatestInboxMessagesRequest(getPrivateDomain(), getInboxTest());
        const response: IRestResponse<Inbox> = await request.execute(getApiToken());

        expect(response.statusCode).toBe(200);
        const result = response.result;
        expect(result).toBeTruthy();
        //expect(result!.domain).toBe(getPrivateDomain());
        expect(result!.to).toBe(getInboxTest());
        expect(Array.isArray(result!.msgs)).toBe(true);
    });

});
