import {createNewRule, getFirstAvailableDomain} from '../TestUtils';
import {getApiToken} from "../TestEnv";
import {DeleteRuleRequest} from "../../src/rule/DeleteRuleRequest";

describe('DeleteRuleRequest Tests', function () {

    // TODO API bug creating rule
    it.skip('testDeleteRuleRequest', async () => {

        const domain = await getFirstAvailableDomain();

        const rule = await createNewRule();

        const request = new DeleteRuleRequest(domain._id, rule!.result!._id);
        const response = await request.execute(getApiToken());
        expect(response.statusCode).toBe(200);
    });

});
