import { Request } from '../Request';
import { IRestResponse } from 'typed-rest-client/RestClient';
import { Team } from "./Team";
export declare class GetTeamRequest implements Request<Team> {
    execute(apiToken: string): Promise<IRestResponse<Team>>;
}
