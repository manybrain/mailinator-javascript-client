import {ENV_API_TOKEN, ENV_AUTH_SECRET, getApiToken, getAuthSecret} from "../TestEnv";
import {EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf} from "../ConditionalTest";
import {InstantTOTP2FACodeRequest} from "../../src/authenticator/InstantTOTP2FACodeRequest";

describe('InstantTOTP2FACodeRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_AUTH_SECRET, "[^\\s]+")
        )
    )('testInstantTOTP2FACodeRequest', async () => {

        const request = new InstantTOTP2FACodeRequest(getAuthSecret());
        const response = await request.execute(getApiToken());

        expect(response.statusCode).toBe(200);
        const result = response.result;
        expect(result).toBeTruthy();
        expect(result!.time_step).toBeTruthy();
        expect(result!.passcode).toBeTruthy();
        expect(result!.next_reset_secs).toBeTruthy();
        expect(Array.isArray(result?.futurecodes)).toBe(true);
    });

});
