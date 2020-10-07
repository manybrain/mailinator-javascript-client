import {PrivateDomainsItem} from "./PrivateDomainsItem";
import {MembersItem} from "./MembersItem";
import {PlanData} from "./PlanData";
import {SmsNumbersItem} from "./SmsNumbersItem";

export class Team {
    private_domains: Array<PrivateDomainsItem>;
    sms_numbers: Array<SmsNumbersItem>;
    members: Array<MembersItem>;
    plan_data: PlanData;
    _id: Array<PrivateDomainsItem>;
    plan: string;
    team_name: string;
    token: string;
    status: string;
}
