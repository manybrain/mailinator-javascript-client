import {ENV_API_TOKEN, getApiToken} from "../TestEnv";
import {EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf} from "../ConditionalTest";
import {GetAuthenticatorsRequest} from "../../src/authenticator/GetAuthenticatorsRequest";

describe('GetAuthenticatorsRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+")
        )
    )('testGetAuthenticatorsRequest', async () => {

        const request = new GetAuthenticatorsRequest();
        const response = await request.execute(getApiToken());

        expect(response.statusCode).toBe(200);
        const result = response.result;
        expect(result).toBeTruthy();
        expect(result!.passcodes).toBeTruthy();
        expect(Array.isArray(result!.passcodes)).toBe(true);
    });

});
