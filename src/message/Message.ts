import { Part } from "./Part";

export class Message {
  is_first_exchange: boolean;
  fromfull: string;
  headers: {};
  subject: string;
  parts: Array<Part>;
  from: string;
  to: string;
  id: string;
  time: number;
  seconds_ago: number;
  domain: string;
  origfrom: string;
  mrid: string;
  size: number;
  stream: string;
  msg_type: string;
  source: string;
  text: string;
}
