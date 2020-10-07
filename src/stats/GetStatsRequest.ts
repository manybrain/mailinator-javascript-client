import {Request} from '../Request';
import {IRequestOptions, IRestResponse} from 'typed-rest-client/RestClient';
import restClient from '../MailinatorRestClient';
import {AUTHORIZATION} from '../Constants';
import {Stats} from "./Stats";

const URL = 'https://api.mailinator.com/v2/team/stats'

export class GetStatsRequest implements Request<Stats> {

    execute(apiToken: string): Promise<IRestResponse<Stats>> {

        const _options: IRequestOptions = {
            additionalHeaders: {
                [AUTHORIZATION]: apiToken
            }
        };

        return restClient.get<Stats>(URL, _options);
    }

}
