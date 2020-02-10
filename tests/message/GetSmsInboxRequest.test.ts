import {IRestResponse} from 'typed-rest-client/RestClient';
import {Inbox} from '../../src/message/Inbox';
import {GetSmsInboxRequest} from '../../src/message/GetSmsInboxRequest';
import {DomainType} from '../../src/domain/DomainType';
import {ENV_API_TOKEN, ENV_PHONE_NUMBER, getApiToken, getPhoneNumber} from "../TestEnv";
import {EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf} from "../ConditionalTest";

describe('GetSmsInboxRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_PHONE_NUMBER, "[^\\s]+")
        )
    )('testSmsMessageRequest', async () => {

        const request = new GetSmsInboxRequest(DomainType.PUBLIC, getPhoneNumber());
        const response: IRestResponse<Inbox> = await request.execute(getApiToken());

        expect(response.statusCode).toBe(200);
        const result = response.result;
        expect(result).toBeTruthy();
        expect(result!.domain).toBe(DomainType.PUBLIC);
        expect(result!.to).toBe(getPhoneNumber());
        expect(Array.isArray(result!.msgs)).toBe(true);
    });

});
