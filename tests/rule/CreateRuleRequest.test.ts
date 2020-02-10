import {createNewRule} from '../TestUtils';
import {EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf} from "../ConditionalTest";
import {ENV_API_TOKEN} from "../TestEnv";

describe('CreateRuleRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+")
        )
    )('testCreateRuleRequest', async () => {

        const response = await createNewRule();
        expect(response.statusCode).toBe(200);
    });

});
