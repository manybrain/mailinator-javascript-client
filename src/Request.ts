import {IRestResponse} from 'typed-rest-client/RestClient';

export interface Request<T> {
    execute(apiToken: string): Promise<IRestResponse<T>>;
}
