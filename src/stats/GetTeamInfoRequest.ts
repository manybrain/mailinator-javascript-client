import {Request} from '../Request';
import {IRequestOptions, IRestResponse} from 'typed-rest-client/RestClient';
import restClient from '../MailinatorRestClient';
import {AUTHORIZATION} from '../Constants';
import { TeamInfo } from './TeamInfo';

const URL = 'https://api.mailinator.com/v2/teaminfo'

export class GetTeamInfoRequest implements Request<TeamInfo> {

    execute(apiToken: string): Promise<IRestResponse<TeamInfo>> {

        const _options: IRequestOptions = {
            additionalHeaders: {
                [AUTHORIZATION]: apiToken
            }
        };

        return restClient.get<TeamInfo>(URL, _options);
    }

}
