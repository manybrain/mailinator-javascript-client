import {EnabledIfEnvironmentVariables, itIf} from "../ConditionalTest";
import {PublicWebhookRequest} from "../../src/webhook/PublicWebhookRequest";
import { getWehhookToAdd } from "../TestUtils";

describe('PublicWebhookRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
        )
    )('testPublicWebhookRequest', async () => {

        const request = new PublicWebhookRequest(getWehhookToAdd());
        const response = await request.execute();

        expect(response.statusCode).toBe(200);
        const result = response.result;
        expect(result).toBeTruthy();
        expect(result!.id).toBeTruthy();
        expect(result!.status).toBe('ok');
    });

});
