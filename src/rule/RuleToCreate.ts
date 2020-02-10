import {Action} from "./Action";
import {Condition} from "./Condition";
import {MatchType} from "./MatchType";

export class RuleToCreate {
    description: string;
    enabled: boolean;
    match = MatchType.ALL;
    name: string;
    priority: number;
    conditions: Array<Condition>;
    actions: Array<Action>;
}