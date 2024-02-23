import {ENV_API_TOKEN, getApiToken} from "../TestEnv";
import {EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf} from "../ConditionalTest";
import {GetAuthenticatorRequest} from "../../src/authenticator/GetAuthenticatorRequest";

describe('GetAuthenticatorRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+")
        )
    )('testGetAuthenticatorRequest', async () => {

        const request = new GetAuthenticatorRequest();
        const response = await request.execute(getApiToken());

        expect(response.statusCode).toBe(200);
        const result = response.result;
        expect(result).toBeTruthy();
        expect(result!.passcodes).toBeTruthy();
        expect(Array.isArray(result!.passcodes)).toBe(true);
    });

});
