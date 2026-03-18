import restClient from '../../src/MailinatorRestClient';
import { GetTeamInfoRequest } from '../../src/stats';

jest.mock('../../src/MailinatorRestClient', () => ({
    __esModule: true,
    default: {
        get: jest.fn()
    }
}));

describe('GetTeamInfoRequest Callable Tests', function () {
    it('is constructible and callable', async () => {
        const mockedGet = restClient.get as jest.Mock;
        mockedGet.mockResolvedValue({
            statusCode: 200,
            result: {
                server_time: Date.now(),
                domains: []
            }
        });

        const request = new GetTeamInfoRequest();
        expect(typeof request.execute).toBe('function');

        const response = await request.execute('test-token');
        expect(response.statusCode).toBe(200);
        expect(mockedGet).toHaveBeenCalledTimes(1);
    });
});
