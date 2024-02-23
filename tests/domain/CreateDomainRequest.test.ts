import {v4 as uuid} from 'uuid';
import {createNewDomain} from '../TestUtils';
import {EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf} from "../ConditionalTest";
import {ENV_API_TOKEN, getApiToken} from "../TestEnv";
import { DeleteDomainRequest } from '../../src/domain/DeleteDomainRequest';

describe('CreateDomainRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+")
        )
    )('testCreateDomainRequest', async () => {

        const random: string = uuid();
        const domainNameToCreate = `jstest${random}.testinator.com`;
        const response = await createNewDomain(domainNameToCreate);
        expect(response.statusCode).toBe(200);
        expect(response.result).toBeTruthy()

        await new DeleteDomainRequest(domainNameToCreate).execute(getApiToken());
    });

});
