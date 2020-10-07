import {createNewRule, getFirstAvailableDomain} from '../TestUtils';
import {EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf} from "../ConditionalTest";
import {ENV_API_TOKEN, ENV_DOMAIN_PRIVATE, getApiToken} from "../TestEnv";
import {DeleteRuleRequest} from "../../src/rule/DeleteRuleRequest";

describe('CreateRuleRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_DOMAIN_PRIVATE, "[^\\s]+")
        )
    )('testCreateRuleRequest', async () => {

        const response = await createNewRule();
        expect(response.statusCode).toBe(200);
        expect(response.result).toBeTruthy()
        expect(response.result?.name).toBeTruthy()
        expect(response.result?.actions).toBeTruthy()
        expect(response.result?.enabled).toBeTruthy()

        const domain = await getFirstAvailableDomain();
        await new DeleteRuleRequest(domain._id, response!.result!._id).execute(getApiToken());
    });

});
