import {createNewRule, getFirstAvailableDomain} from '../TestUtils';
import {getApiToken} from "../TestEnv";
import {DisableRuleRequest} from "../../src/rule/DisableRuleRequest";

describe('DisableRuleRequest Tests', function () {

    // TODO API bug creating rule
    it.skip('testDisableRuleRequest', async () => {

        const domain = await getFirstAvailableDomain();
        const rule = await createNewRule();

        const request = new DisableRuleRequest(domain._id, rule!.result!._id);
        const response = await request.execute(getApiToken());
        expect(response.statusCode).toBe(200);
    });

});
