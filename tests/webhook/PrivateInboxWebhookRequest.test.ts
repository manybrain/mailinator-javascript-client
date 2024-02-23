import {EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf} from "../ConditionalTest";
import {PrivateInboxWebhookRequest} from "../../src/webhook/PrivateInboxWebhookRequest";
import { getWehhookToAdd } from "../TestUtils";
import { ENV_WEBHOOKTOKEN_PRIVATEDOMAIN, ENV_WEBHOOK_INBOX, getWebhookInbox, getWebhookTokenPrivateDomain } from "../TestEnv";

describe('PrivateInboxWebhookRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_WEBHOOKTOKEN_PRIVATEDOMAIN, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_WEBHOOK_INBOX, "[^\\s]+")
        )
    )('testPrivateInboxWebhookRequest', async () => {

        const request = new PrivateInboxWebhookRequest(getWebhookTokenPrivateDomain(), getWebhookInbox(), getWehhookToAdd());
        const response = await request.execute();

        expect(response.statusCode).toBe(200);
        const result = response.result;
        expect(result).toBeTruthy();
        expect(result!.id).toBeTruthy();
        expect(result!.status).toBe('ok');
    });

});
