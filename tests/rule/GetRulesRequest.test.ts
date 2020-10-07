import {getFirstAvailableDomain} from '../TestUtils';
import {ENV_API_TOKEN, getApiToken} from "../TestEnv";
import {EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf} from "../ConditionalTest";
import {GetRulesRequest} from "../../src/rule/GetRulesRequest";

describe('GetRulesRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+")
        )
    )('testGetRulesRequest', async () => {

        const domain = await getFirstAvailableDomain();

        const request = new GetRulesRequest(domain._id);
        const response = await request.execute(getApiToken());
        expect(response.statusCode).toBe(200);
        const result = response.result;
        expect(Array.isArray(result!.rules)).toBe(true);
    });

});
