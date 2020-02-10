import {getFirstAvailableDomain} from '../TestUtils';
import {GetDomainRequest} from '../../src/domain/GetDomainRequest';
import {ENV_API_TOKEN, getApiToken} from "../TestEnv";
import {EnabledIfEnvironmentVariable, EnabledIfEnvironmentVariables, itIf} from "../ConditionalTest";

describe('GetDomainRequest Tests', function () {

    itIf(
        new EnabledIfEnvironmentVariables(
            new EnabledIfEnvironmentVariable(ENV_API_TOKEN, "[^\\s]+")
        )
    )('testGetDomainRequest', async () => {

        const domain = await getFirstAvailableDomain();
        const request = new GetDomainRequest(domain.name);
        const response = await request.execute(getApiToken());

        expect(response.statusCode).toBe(200);
        const result = response.result;
        expect(result).toBeTruthy();
        expect(result!.name).toBeTruthy();
        expect(result!._id).toBeTruthy();
        expect(result!.description).toBeTruthy();
        expect(result!.enabled).toBeTruthy();
        expect(result!.rules).toBeTruthy();
        expect(Array.isArray(result!.rules)).toBe(true);
    });

});
