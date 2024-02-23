import {ENV_WEBHOOK_CUSTOMSERVICE, ENV_WEBHOOK_INBOX, getWebhookCustomService, getWebhookInbox} from "../TestEnv";
import {EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf} from "../ConditionalTest";
import {PublicCustomServiceInboxWebhookRequest} from "../../src/webhook/PublicCustomServiceInboxWebhookRequest";
import { getWehhookToAdd } from "../TestUtils";

describe('PublicCustomServiceInboxWebhookRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_WEBHOOK_INBOX, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_WEBHOOK_CUSTOMSERVICE, "[^\\s]+")
        )
    )('testPublicCustomServiceInboxWebhookRequest', async () => {

        const request = new PublicCustomServiceInboxWebhookRequest(getWebhookCustomService(), getWebhookInbox(), getWehhookToAdd());
        const response = await request.execute();

        expect(response.statusCode).toBe(200);
    });

});
