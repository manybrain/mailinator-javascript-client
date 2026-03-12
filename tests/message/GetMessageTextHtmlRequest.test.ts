import { GetMessageTextHtmlRequest } from '../../src/message/GetMessageTextHtmlRequest';
import {
    ENV_API_TOKEN,
    ENV_REAL_MESSAGE_ID,
    getApiToken
} from '../TestEnv';
import { getRealMessageId } from '../TestEnv';
import { EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf } from '../ConditionalTest';

describe('GetMessageTextHtmlRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_REAL_MESSAGE_ID, "[^\\s]+")
        )
    )('testGetMessageTextHtmlRequest', async () => {

        const domain = 'private';
        const messageId = getRealMessageId();

        const request = new GetMessageTextHtmlRequest(domain, messageId);
        const response = await request.execute(getApiToken());

        expect(response.statusCode).toBe(200);
        const result = response.result;
        expect(result).toBeTruthy();
        expect(Object.keys(result!)).toEqual(['text/html']);
        expect((result as Record<string, unknown>)['text/html']).toBeTruthy();
    });
});
