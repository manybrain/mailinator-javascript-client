import {ActionType} from './ActionType';
import {ActionData} from './ActionData';

export class Action {
    action: ActionType;
    action_data: ActionData;
    destination: string;
}