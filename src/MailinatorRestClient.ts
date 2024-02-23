import * as restm from 'typed-rest-client/RestClient';
import { COMMON_USER_AGENT, USERAGENT } from './Constants';

const defaultHeaders = {
    [USERAGENT]: COMMON_USER_AGENT,
  };

const restClient: restm.RestClient = new restm.RestClient('typed-rest-client', undefined, undefined, defaultHeaders);

export default restClient;