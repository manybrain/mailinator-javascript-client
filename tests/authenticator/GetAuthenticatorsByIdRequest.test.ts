import {ENV_API_TOKEN, ENV_AUTH_ID, getApiToken, getAuthId} from "../TestEnv";
import {EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf} from "../ConditionalTest";
import {GetAuthenticatorsByIdRequest} from "../../src/authenticator/GetAuthenticatorsByIdRequest";

describe('GetAuthenticatorsByIdRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_AUTH_ID, "[^\\s]+")
        )
    )('testGetAuthenticatorsByIdRequest', async () => {

        const request = new GetAuthenticatorsByIdRequest(getAuthId());
        const response = await request.execute(getApiToken());

        expect(response.statusCode).toBe(200);
        const result = response.result;
        expect(result).toBeTruthy();
    });

});
