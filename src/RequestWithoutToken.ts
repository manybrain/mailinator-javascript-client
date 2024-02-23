import {IRestResponse} from 'typed-rest-client/RestClient';

export interface RequestWithoutToken<T> {
    execute(): Promise<IRestResponse<T>>;
}
