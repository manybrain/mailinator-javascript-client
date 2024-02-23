import {ENV_WEBHOOK_INBOX, getWebhookInbox} from "../TestEnv";
import {EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf} from "../ConditionalTest";
import {PublicInboxWebhookRequest} from "../../src/webhook/PublicInboxWebhookRequest";
import { getWehhookToAdd } from "../TestUtils";

describe('PublicInboxWebhookRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_WEBHOOK_INBOX, "[^\\s]+")
        )
    )('testPublicInboxWebhookRequest', async () => {

        const request = new PublicInboxWebhookRequest(getWebhookInbox(), getWehhookToAdd());
        const response = await request.execute();

        expect(response.statusCode).toBe(200);
        const result = response.result;
        expect(result).toBeTruthy();
        expect(result!.id).toBeTruthy();
        expect(result!.status).toBe('ok');
    });

});
