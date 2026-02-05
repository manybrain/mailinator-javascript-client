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
            new GetMessageRequest("yourDomainNameHere", "yourMessageIdHere")
        );
```

#### Build tests

* `npm test`

##### Environment Configuration

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

By default, most of the tests are skipped. 

##### Build with tests

Most of the tests require env variables with valid values. Visit tests source code and review `EnabledIfEnvironmentVariable` wrapped parts. The more env variables you set, the more tests are run.

#### Create index

* Install https://www.npmjs.com/package/create-ts-index `npm install create-ts-index -g`
* Run `cti create .`
