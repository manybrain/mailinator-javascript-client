#### [Mailinator](https://www.mailinator.com/) REST API client for JavaScript applications. 

Uses [Microsoft's typed-rest-client](https://github.com/microsoft/typed-rest-client). All requests are async functions.

#### Usage example

##### Create MailinatorClient

```typescript
const mailinatorClient: MailinatorClient = new MailinatorClient("yourApiKeyHere");
```

###### Get inbox from domain

```typescript
const response: IRestResponse<Inbox> = await mailinatorClient.request(
            new GetInboxRequest("yourDomainNameHere")
        );
```

###### Get paginated messages from domain and inbox

```typescript
const response: IRestResponse<Inbox> = await mailinatorClient.request(
            new GetInboxRequest("yourDomainNameHere", "yourInboxNameHere", 10, 20, Sort.DESC, true)
        );
```
                                                       
###### Get message
             
```typescript                                
const response: IRestResponse<Message> = await mailinatorClient.request(
            new GetMessageRequest("yourDomainNameHere", "yourInboxNameHere", "yourMessageIdHere")
        );
```

#### Build tests

* `npm test`

By default, most of the tests are skipped. 

##### Build with tests

Most of the tests require env variables with valid values. Visit tests source code and review `EnabledIfEnvironmentVariable` wrapped parts. The more env variables you set, the more tests are run.

* `MAILINATOR_TEST_API_TOKEN` - API tokens for authentication; basic requirement across many tests;see also https://manybrain.github.io/m8rdocs/#api-authentication
* `MAILINATOR_TEST_DOMAIN_PRIVATE` - private domain; visit https://www.mailinator.com/
* `MAILINATOR_TEST_INBOX` - some already existing inbox within the private domain
* `MAILINATOR_TEST_PHONE_NUMBER` - associated phone number within the private domain; see also https://manybrain.github.io/m8rdocs/#fetch-an-sms-messages
* `MAILINATOR_TEST_MESSAGE_WITH_ATTACHMENT_ID` - existing message id within inbox (see above) within private domain (see above); see also https://manybrain.github.io/m8rdocs/#fetch-message
* `MAILINATOR_TEST_ATTACHMENT_ID` - existing message id within inbox (see above) within private domain (see above); see also https://manybrain.github.io/m8rdocs/#fetch-message
* `MAILINATOR_TEST_DELETE_DOMAIN` - don't use it unless you are 100% sure what you are doing
