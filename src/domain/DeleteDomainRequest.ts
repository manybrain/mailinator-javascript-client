import {Request} from '../Request';
import {IRequestOptions, IRestResponse} from 'typed-rest-client/RestClient';
import restClient from '../MailinatorRestClient';
import {AUTHORIZATION} from '../Constants';
import {ResponseStatus} from "../ResponseStatus";

const _resolveTemplateUrl = (domainId: string) => {
    return `https://api.mailinator.com/v2/domains/${domainId}`;
};

export class DeleteDomainRequest implements Request<ResponseStatus> {

    constructor(private readonly domainId: string) {
    }

    execute(apiToken: string): Promise<IRestResponse<ResponseStatus>> {

        const _options: IRequestOptions = {
            additionalHeaders: {
                [AUTHORIZATION]: apiToken
            }
        };

        return restClient.del<ResponseStatus>(_resolveTemplateUrl(this.domainId), _options);
    }

}