import {DeleteDomainRequest} from '../../src/domain';
import {randomUUID} from 'node:crypto';
import {createNewDomain} from '../TestUtils';
import {EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf} from "../ConditionalTest";
import {ENV_API_TOKEN, getApiToken} from "../TestEnv";

// Tests are skipped. This endpoint is deprecated
describe.skip('CreateDomainRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+")
        )
    )('testCreateDomainRequest', async () => {

        const random: string = randomUUID();
        const domainNameToCreate = `jstest${random}.testinator.com`;
        const response = await createNewDomain(domainNameToCreate);
        expect(response.statusCode).toBe(200);
        expect(response.result).toBeTruthy()

        await new DeleteDomainRequest(domainNameToCreate).execute(getApiToken());
    });

});
