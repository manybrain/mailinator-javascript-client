import It = jest.It;

interface TestCondition {
    check: () => boolean
}

export class EnabledIfEnvironmentVariable implements TestCondition {

    constructor(private named: string,
                private matches: string) {
    }

    check: () => boolean = () => {
        const envValue = process.env[this.named];
        return (envValue !== undefined) && (RegExp(this.matches).test(envValue));
    }
}

export class EnabledIfEnvironmentVariables implements TestCondition {

    private readonly args: EnabledIfEnvironmentVariable[];

    constructor(...args: EnabledIfEnvironmentVariable[]) {
        this.args = args;
    }

    check: () => boolean = () => {
        return this.args && this.args.every(a => a.check());
    }
}

export const itIf: (condition: TestCondition) => It = condition => condition.check() ? it : it.skip;