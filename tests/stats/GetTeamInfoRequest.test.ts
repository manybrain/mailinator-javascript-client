import {ENV_API_TOKEN, getApiToken} from "../TestEnv";
import {EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf} from "../ConditionalTest";
import {GetTeamInfoRequest} from "../../src/stats/GetTeamInfoRequest";

describe('GetTeamInfoRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+")
        )
    )('testGetTeamInfoRequest', async () => {

        const request = new GetTeamInfoRequest();
        const response = await request.execute(getApiToken());

        expect(response.statusCode).toBe(200);
        const result = response.result;
        expect(result).toBeTruthy();
        expect(result?.server_time).toBeTruthy();
        expect(Array.isArray(result?.domains)).toBe(true);
    });

});
