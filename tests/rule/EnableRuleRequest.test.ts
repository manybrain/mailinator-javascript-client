import {createNewRule, getFirstAvailableDomain} from '../TestUtils';
import {getApiToken} from "../TestEnv";
import {EnableRuleRequest} from "../../src/rule/EnableRuleRequest";

describe('EnableRuleRequest Tests', function () {

    // TODO API bug creating rule
    it.skip('testEnableRuleRequest', async () => {

        const domain = await getFirstAvailableDomain();
        const rule = await createNewRule();

        const request = new EnableRuleRequest(domain._id, rule!.result!._id);
        const response = await request.execute(getApiToken());
        expect(response.statusCode).toBe(200);
    });

});
