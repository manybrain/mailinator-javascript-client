import {v4 as uuid} from 'uuid';
import {createNewDomain} from '../TestUtils';
import {DeleteDomainRequest} from '../../src/domain/DeleteDomainRequest';
import {ENV_API_TOKEN, getApiToken} from "../TestEnv";
import {EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf} from "../ConditionalTest";

describe('DeleteDomainRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+")
        )
    )('testDeleteDomainRequest', async () => {

        const random: string = uuid();
        const domainNameToCreate = `jstest${random}.testinator.com`;
        const createDomainResponse = await createNewDomain(domainNameToCreate);

        const request = new DeleteDomainRequest(domainNameToCreate);
        const response = await request.execute(getApiToken());

        expect(response.statusCode).toBe(200);
        const result = response.result;
        expect(result).toBeTruthy();
        expect(result!.status).toBeTruthy();
    });

});
