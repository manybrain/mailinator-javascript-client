import { GetMessageSummaryRequest } from '../../src/message/GetMessageSummaryRequest';
import {
    ENV_API_TOKEN,
    getApiToken,
    ENV_REAL_MESSAGE_ID
} from '../TestEnv';
import { getRealMessageId } from '../TestEnv';
import { EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf } from '../ConditionalTest';

describe('GetMessageSummaryRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_REAL_MESSAGE_ID, "[^\\s]+")
        )
    )('testGetMessageSummaryRequest', async () => {

        const domain = 'private';
        const messageId = getRealMessageId();

        const request = new GetMessageSummaryRequest(domain, messageId);
        const response = await request.execute(getApiToken());

        expect(response.statusCode).toBe(200);
        const result = response.result;
        expect(result).toBeTruthy();
        expect(result!.summary).toBeTruthy();
        expect(result!.summary.id).toBe(messageId);
        expect(result!.summary.subject).toBeTruthy();
    });
});
