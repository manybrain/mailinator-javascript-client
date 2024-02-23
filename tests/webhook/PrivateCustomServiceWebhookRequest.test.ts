import {EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf} from "../ConditionalTest";
import {PrivateCustomServiceWebhookRequest} from "../../src/webhook/PrivateCustomServiceWebhookRequest";
import { getWehhookToAdd } from "../TestUtils";
import { ENV_WEBHOOKTOKEN_CUSTOMSERVICE, ENV_WEBHOOK_CUSTOMSERVICE, getWebhookCustomService, getWebhookTokenCustomService } from "../TestEnv";

describe('PrivateCustomServiceWebhookRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_WEBHOOKTOKEN_CUSTOMSERVICE, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_WEBHOOK_CUSTOMSERVICE, "[^\\s]+")
        )
    )('testPrivateCustomServiceWebhookRequest', async () => {

        const request = new PrivateCustomServiceWebhookRequest(getWebhookTokenCustomService(), getWebhookCustomService(), getWehhookToAdd());
        const response = await request.execute();

        expect(response.statusCode).toBe(200);
    });

});
