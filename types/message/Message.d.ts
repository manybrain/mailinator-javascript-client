import { Part } from './Part';
export declare class Message {
    fromfull: string;
    headers: {};
    subject: string;
    parts: Array<Part>;
    from: string;
    to: string;
    id: string;
    time: number;
    secondsAgo: number;
    domain: string;
    origfrom: string;
    mrid: string;
    size: number;
    stream: string;
    msgType: string;
    source: string;
    text: string;
}
