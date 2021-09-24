import { Request } from '../Request';
import { IRestResponse } from 'typed-rest-client/RestClient';
import { Stats } from "./Stats";
export declare class GetStatsRequest implements Request<Stats> {
    execute(apiToken: string): Promise<IRestResponse<Stats>>;
}
