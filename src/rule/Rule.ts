import {MatchType} from './MatchType';
import {Condition} from './Condition';
import {Action} from './Action';

export class Rule {
    _id: string;
    description: string;
    enabled: boolean;
    match: MatchType;
    name: string;
    conditions: Array<Condition>;
    actions: Array<Action>;
}