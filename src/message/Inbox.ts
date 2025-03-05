import {Message} from './Message';

export class Inbox {
    domain: string;
    to: string;
    msgs: Array<Message>;
    cursor: string;
}