import {ENV_WEBHOOK_CUSTOMSERVICE, getWebhookCustomService, getWebhookInbox} from "../TestEnv";
import {EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf} from "../ConditionalTest";
import {PublicCustomServiceWebhookRequest} from "../../src/webhook/PublicCustomServiceWebhookRequest";
import { getWehhookToAdd } from "../TestUtils";

describe('PublicCustomServiceWebhookRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_WEBHOOK_CUSTOMSERVICE, "[^\\s]+")
        )
    )('testPublicCustomServiceWebhookRequest', async () => {

        const request = new PublicCustomServiceWebhookRequest(getWebhookCustomService(), getWehhookToAdd());
        const response = await request.execute();

        expect(response.statusCode).toBe(200);
    });

});
