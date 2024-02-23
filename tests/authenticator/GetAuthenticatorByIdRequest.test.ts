import {ENV_API_TOKEN, ENV_AUTH_ID, getApiToken, getAuthId} from "../TestEnv";
import {EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf} from "../ConditionalTest";
import {GetAuthenticatorByIdRequest} from "../../src/authenticator/GetAuthenticatorByIdRequest";

describe('GetAuthenticatorByIdRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_AUTH_ID, "[^\\s]+")
        )
    )('testGetAuthenticatorByIdRequest', async () => {

        const request = new GetAuthenticatorByIdRequest(getAuthId());
        const response = await request.execute(getApiToken());

        expect(response.statusCode).toBe(200);
        const result = response.result;
        expect(result).toBeTruthy();
    });

});
