import {v4 as uuid} from 'uuid';
import {MessageToPost} from '../src/message/MessageToPost';
import {PostMessageRequest} from '../src/message/PostMessageRequest';
import {getApiToken} from "./TestEnv";
import {GetDomainsRequest} from "../src/domain/GetDomainsRequest";
import {ActionData} from "../src/rule/ActionData";
import {Action} from "../src/rule/Action";
import {ActionType} from "../src/rule/ActionType";
import {Condition} from "../src/rule/Condition";
import {OperationType} from "../src/rule/OperationType";
import {RuleToCreate} from "../src/rule/RuleToCreate";
import {CreateRuleRequest} from "../src/rule/CreateRuleRequest";

export const postMessage = (domain: string, inbox: string) => {

    const random: string = uuid();

    const message = new MessageToPost("raul", `testPostMessageRequest ${random}`, `text ${random}`);

    const request = new PostMessageRequest(domain, inbox, message);
    return request.execute(getApiToken());
};


export const getFirstAvailableDomain = async () => {
    const request = new GetDomainsRequest();
    const response = await request.execute(getApiToken());
    const result = response.result;
    return result!.domains[0];
};

export const createNewRule = async () => {

    const domain = await getFirstAvailableDomain();

    const actionData = new ActionData();
    actionData.url = "https://www.mywebsite.com/restendpoint";
    const action = new Action();
    action.action = ActionType.WEBHOOK;
    action.action_data = actionData;

    const condition = new Condition();
    condition.operation = OperationType.EQUALS;
    condition.value = "raul";

    const random: string = uuid();

    const ruleToCreate = new RuleToCreate();
    ruleToCreate.name = `rule name ${random}`;
    ruleToCreate.priority = 15;
    ruleToCreate.conditions = [condition];
    ruleToCreate.actions = [action];

    const request = new CreateRuleRequest(domain._id, ruleToCreate);
    return request.execute(getApiToken());
};
