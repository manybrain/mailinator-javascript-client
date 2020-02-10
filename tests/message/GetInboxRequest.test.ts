import {GetInboxRequest} from '../../src/message/GetInboxRequest';
import {IRestResponse} from 'typed-rest-client/RestClient';
import {Inbox} from '../../src/message/Inbox';
import {DomainType} from '../../src/domain/DomainType';
import {Sort} from '../../src/message/Sort';
import {
    ENV_API_TOKEN,
    ENV_DOMAIN_PRIVATE,
    ENV_INBOX_TEST,
    getApiToken,
    getInboxTest,
    getPrivateDomain
} from "../TestEnv";
import {EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf} from "../ConditionalTest";

describe('GetInboxRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_DOMAIN_PRIVATE, "[^\\s]+")
        )
    )('testInboxRequestWithPrivateDomain', async () => {

        const request: GetInboxRequest = new GetInboxRequest(getPrivateDomain());
        const response: IRestResponse<Inbox> = await request.execute(getApiToken());

        expect(response.statusCode).toBe(200);
        const result = response.result;
        expect(result).toBeTruthy();
        expect(result!.domain).toBe(getPrivateDomain());
        expect(result!.to).toBe('*');
        expect(Array.isArray(result!.msgs)).toBe(true);
    });

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_DOMAIN_PRIVATE, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_INBOX_TEST, "[^\\s]+")
        )
    )('testInboxRequestWithPrivateDomainAndInbox', async () => {

        const request: GetInboxRequest = new GetInboxRequest(getPrivateDomain(), getInboxTest());
        const response: IRestResponse<Inbox> = await request.execute(getApiToken());

        expect(response.statusCode).toBe(200);
        const result = response.result;
        expect(result).toBeTruthy();
        expect(result!.domain).toBe(getPrivateDomain());
        expect(result!.to).toBe(getInboxTest());
        expect(Array.isArray(result!.msgs)).toBe(true);
    });

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+")
        )
    )('testInboxRequestWithPrivateDomainCommon', async () => {

        const request = new GetInboxRequest(DomainType.PRIVATE);
        const response: IRestResponse<Inbox> = await request.execute(getApiToken());

        expect(response.statusCode).toBe(200);
        const result = response.result;
        expect(result).toBeTruthy();
        expect(result!.domain).toBe(DomainType.PRIVATE);
        expect(result!.to).toBe('*');
        expect(Array.isArray(result!.msgs)).toBe(true);
    });

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_INBOX_TEST, "[^\\s]+")
        )
    )('testInboxRequestWithPublicDomainCommon', async () => {

        const request = new GetInboxRequest(DomainType.PUBLIC, getInboxTest());
        const response: IRestResponse<Inbox> = await request.execute(getApiToken());

        expect(response.statusCode).toBe(200);
        const result = response.result;
        expect(result).toBeTruthy();
        expect(result!.domain).toBe(DomainType.PUBLIC);
        expect(result!.to).toBe(getInboxTest());
        expect(Array.isArray(result!.msgs)).toBe(true);
    });

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_DOMAIN_PRIVATE, "[^\\s]+")
        )
    )('testInboxRequestWithPrivateDomainWithQueryParams', async () => {

        const request = new GetInboxRequest(getPrivateDomain(), undefined, 10, 20, Sort.DESC, true);

        const response: IRestResponse<Inbox> = await request.execute(getApiToken());

        expect(response.statusCode).toBe(200);
        const result = response.result;
        expect(result).toBeTruthy();
        expect(result!.domain).toBe(getPrivateDomain());
        expect(result!.to).toBe('*');
        expect(Array.isArray(result!.msgs)).toBe(true);
    });


});
