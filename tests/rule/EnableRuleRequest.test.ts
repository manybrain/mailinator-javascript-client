import {createNewRule, getFirstAvailableDomain} from '../TestUtils';
import {ENV_API_TOKEN, ENV_DOMAIN_PRIVATE, getApiToken} from "../TestEnv";
import {EnableRuleRequest} from "../../src/rule/EnableRuleRequest";
import {DeleteRuleRequest} from "../../src/rule/DeleteRuleRequest";
import {EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf} from "../ConditionalTest";

describe('EnableRuleRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_DOMAIN_PRIVATE, "[^\\s]+")
        )
    )('testEnableRuleRequest', async () => {

        const domain = await getFirstAvailableDomain();
        const rule = await createNewRule();

        const request = new EnableRuleRequest(domain.name, rule!.result!._id);
        const response = await request.execute(getApiToken());
        expect(response.statusCode).toBe(200);

        await new DeleteRuleRequest(domain.name, rule!.result!._id).execute(getApiToken());
    });

});
