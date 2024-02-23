export class Authenticator {
    id: string;
    time_step: number;
    futurecodes: Array<string>;
    next_reset_secs: number;
    passcode: string;
}