import {EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf} from "../ConditionalTest";
import {PrivateWebhookRequest} from "../../src/webhook/PrivateWebhookRequest";
import { getWehhookToAdd } from "../TestUtils";
import { ENV_WEBHOOKTOKEN_PRIVATEDOMAIN, getWebhookTokenPrivateDomain } from "../TestEnv";

describe('PrivateWebhookRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_WEBHOOKTOKEN_PRIVATEDOMAIN, "[^\\s]+")
        )
    )('testPrivateWebhookRequest', async () => {

        const request = new PrivateWebhookRequest(getWebhookTokenPrivateDomain(), getWehhookToAdd());
        const response = await request.execute();

        expect(response.statusCode).toBe(200);
        const result = response.result;
        expect(result).toBeTruthy();
        expect(result!.id).toBeTruthy();
        expect(result!.status).toBe('ok');
    });

});
