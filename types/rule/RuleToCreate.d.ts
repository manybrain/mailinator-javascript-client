import { Action } from "./Action";
import { Condition } from "./Condition";
import { MatchType } from "./MatchType";
export declare class RuleToCreate {
    description: string;
    enabled: boolean;
    match: MatchType;
    name: string;
    priority: number;
    conditions: Array<Condition>;
    actions: Array<Action>;
}
