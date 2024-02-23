import {DeleteDomainMessagesRequest} from '../../src/message/DeleteDomainMessagesRequest';
import {ENV_API_TOKEN, ENV_DELETE_DOMAIN, ENV_DOMAIN_PRIVATE, getApiToken, getDeleteDomain} from "../TestEnv";
import {EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf} from "../ConditionalTest";

describe('DeleteDomainMessagesRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_DOMAIN_PRIVATE, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_DELETE_DOMAIN, "true")
        )
    )('testDeleteDomainMessagesRequest', async () => {

        const request = new DeleteDomainMessagesRequest(getDeleteDomain());
        const response = await request.execute(getApiToken());

        expect(response.statusCode).toBe(200);
        const result = response.result;
        expect(result).toBeTruthy();
        expect(result!.status).toBe("ok");
    });

});
