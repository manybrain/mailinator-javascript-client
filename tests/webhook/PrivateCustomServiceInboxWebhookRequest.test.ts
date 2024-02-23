import {EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf} from "../ConditionalTest";
import {PrivateCustomServiceInboxWebhookRequest} from "../../src/webhook/PrivateCustomServiceInboxWebhookRequest";
import { getWehhookToAdd } from "../TestUtils";
import { ENV_WEBHOOKTOKEN_CUSTOMSERVICE, ENV_WEBHOOK_CUSTOMSERVICE, ENV_WEBHOOK_INBOX, getWebhookCustomService, getWebhookInbox, getWebhookTokenCustomService } from "../TestEnv";

describe('PrivateCustomServiceInboxWebhookRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_WEBHOOKTOKEN_CUSTOMSERVICE, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_WEBHOOK_CUSTOMSERVICE, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_WEBHOOK_INBOX, "[^\\s]+")
        )
    )('testPrivateCustomServiceInboxWebhookRequest', async () => {

        const request = new PrivateCustomServiceInboxWebhookRequest(getWebhookTokenCustomService(), getWebhookCustomService(), getWebhookInbox(), getWehhookToAdd());
        const response = await request.execute();

        expect(response.statusCode).toBe(200);
    });

});
