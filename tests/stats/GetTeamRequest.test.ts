import {ENV_API_TOKEN, getApiToken} from "../TestEnv";
import {EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf} from "../ConditionalTest";
import {GetTeamRequest} from "../../src/stats/GetTeamRequest";

describe('GetTeamRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+")
        )
    )('testGetTeamRequest', async () => {

        const request = new GetTeamRequest();
        const response = await request.execute(getApiToken());

        expect(response.statusCode).toBe(200);
        const result = response.result;
        expect(result).toBeTruthy();
        expect(Array.isArray(result?.private_domains)).toBe(true);
        expect(Array.isArray(result?.sms_numbers)).toBe(true);
        expect(Array.isArray(result?.members)).toBe(true);
        expect(result?.plan_data).toBeTruthy();
        expect(result?.plan).toBeTruthy();
        expect(result?.team_name).toBeTruthy();
        expect(result?.token).toBeTruthy();
        expect(result?.status).toBeTruthy();
    });

});
