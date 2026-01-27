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
* `MAILINATOR_TEST_WEBHOOKTOKEN_PRIVATEDOMAIN` - private domain for webhook token
* `MAILINATOR_TEST_WEBHOOKTOKEN_CUSTOMSERVICE` - custom service for webhook token
* `MAILINATOR_TEST_AUTH_SECRET` - authenticator secret
* `MAILINATOR_TEST_AUTH_ID` - authenticator id
* `MAILINATOR_TEST_WEBHOOK_INBOX` - inbox for webhook
* `MAILINATOR_TEST_WEBHOOK_CUSTOMSERVICE` - custom service for webhook

#### Create index

* Install https://www.npmjs.com/package/create-ts-index `npm install create-ts-index -g`
* Run `cti create .`

#### Version Management

To maintain version consistency across package.json, git tags, and NPM, always use the `npm version` command:

```bash
# For patch releases (1.0.6 -> 1.0.7)
npm version patch

# For minor releases (1.0.6 -> 1.1.0)
npm version minor

# For major releases (1.0.6 -> 2.0.0)
npm version major
```

This command will:
1. Update the version in `package.json`
2. Create a git commit with the version change
3. Create a git tag (e.g., `v1.0.7`)
4. Automatically push the commit and tag to GitHub (via `postversion` script)

After running `npm version`, publish to NPM:

```bash
npm publish
```

**Important**: Never manually edit the version in `package.json`. Always use `npm version` to ensure package.json, git tags, and NPM versions stay in sync.
