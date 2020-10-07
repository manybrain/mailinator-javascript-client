import {Request} from '../Request';
import {IRequestOptions, IRestResponse} from 'typed-rest-client/RestClient';
import restClient from '../MailinatorRestClient';
import {AUTHORIZATION} from '../Constants';
import {Team} from "./Team";

const URL = 'https://api.mailinator.com/v2/team'

export class GetTeamRequest implements Request<Team> {

    execute(apiToken: string): Promise<IRestResponse<Team>> {

        const _options: IRequestOptions = {
            additionalHeaders: {
                [AUTHORIZATION]: apiToken
            }
        };

        return restClient.get<Team>(URL, _options);
    }

}
