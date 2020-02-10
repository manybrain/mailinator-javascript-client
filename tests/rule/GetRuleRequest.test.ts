import {v4 as uuid} from 'uuid';
import {createNewRule, getFirstAvailableDomain} from '../TestUtils';
import {ENV_API_TOKEN, getApiToken} from "../TestEnv";
import {EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf} from "../ConditionalTest";
import {GetRuleRequest} from "../../src/rule/GetRuleRequest";

describe('GetRuleRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+")
        )
    )('testGetRuleRequest', async () => {

        const domain = await getFirstAvailableDomain();

        const rule = await createNewRule();

        if (rule.result !== null) {
            const request = new GetRuleRequest(domain._id, rule.result._id);
            const response = await request.execute(getApiToken());
            expect(response.statusCode).toBe(200);
            const result = response.result;
            expect(result).toBeTruthy();
        }
        // TODO workaround for API bug
        else {
            const request = new GetRuleRequest(domain._id, uuid());
            const response = await request.execute(getApiToken());
            expect(response.statusCode).toBe(404);
        }
    });

});
