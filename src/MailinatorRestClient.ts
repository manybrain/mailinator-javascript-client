import * as restm from 'typed-rest-client/RestClient';
import { COMMON_USER_AGENT } from './Constants';

const restClient: restm.RestClient = new restm.RestClient(COMMON_USER_AGENT, undefined, undefined, { socketTimeout: 125000});

export default restClient;