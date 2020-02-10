import {v4 as uuid} from 'uuid';
import {postMessage} from '../TestUtils';
import {DeleteInboxMessagesRequest} from '../../src/message/DeleteInboxMessagesRequest';
import {ENV_API_TOKEN, ENV_DOMAIN_PRIVATE, getApiToken, getPrivateDomain} from "../TestEnv";
import {EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf} from "../ConditionalTest";

describe('DeleteInboxMessagesRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+"),
            new EnabledIfEnvironmentVariable(ENV_DOMAIN_PRIVATE, "[^\\s]+")
        )
    )('testDeleteInboxMessagesRequest', async () => {

        const domain = getPrivateDomain();
        const inbox = `inbox ${uuid()}`;
        await postMessage(domain, inbox);
        await postMessage(domain, inbox);
        await postMessage(domain, inbox);

        const request = new DeleteInboxMessagesRequest(domain, inbox);
        const response = await request.execute(getApiToken());

        expect(response.statusCode).toBe(200);
        const result = response.result;
        expect(result).toBeTruthy();
        expect(result!.count).toBe(3);
        expect(result!.status).toBe("ok");
    });

});
