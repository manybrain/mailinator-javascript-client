import {Rule} from "../rule/Rule";

export class Domain {
    _id: string;
    description: string;
    enabled: boolean;
    name: string;
    ownerid: string;
    rules: Array<Rule>;
}