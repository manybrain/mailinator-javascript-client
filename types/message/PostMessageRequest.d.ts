import { Request } from '../Request';
import { IRestResponse } from 'typed-rest-client/RestClient';
import { MessageToPost } from './MessageToPost';
import { PostedMessage } from './PostedMessage';
export declare class PostMessageRequest implements Request<PostedMessage> {
    private readonly domain;
    private readonly inbox;
    private readonly message;
    constructor(domain: string, inbox: string, message: MessageToPost);
    execute(apiToken: string): Promise<IRestResponse<PostedMessage>>;
}
