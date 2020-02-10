import {Rule} from '../rule/Rule';

export class PostedMessage {
    status: string;
    id: string;
    rules_fired: Array<Rule>;
}