import { GetMessageHeadersRequest } from '../../src/message/GetMessageHeadersRequest';
import {
    ENV_API_TOKEN,
    ENV_REAL_MESSAGE_ID,
    getApiToken
} from '../TestEnv';
import { getRealMessageId } from '../TestEnv';
import { EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf } from '../ConditionalTest';

describe('GetMessageHeadersRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_REAL_MESSAGE_ID, "[^\\s]+")
        )
    )('testGetMessageHeadersRequest', async () => {

        const domain = 'private';
        const messageId = getRealMessageId();

        const request = new GetMessageHeadersRequest(domain, messageId);
        const response = await request.execute(getApiToken());

        expect(response.statusCode).toBe(200);
        const result = response.result;
        expect(result).toBeTruthy();
        expect(Object.keys(result!)).toEqual(['headers']);
        expect((result as unknown as Record<string, unknown>)['headers']).toBeTruthy();
        expect(((result as unknown as Record<string, unknown>)['headers'] as Record<string, unknown>)['subject']).toBeTruthy();
    });
});
