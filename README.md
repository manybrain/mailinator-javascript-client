# Mailinator JavaScript SDK

The official Mailinator JavaScript SDK. This REST API client is implemented as a thin wrapper around the [Mailinator API](https://www.mailinator.com/documentation/docs/api/index.html). The OpenAPI specification is the source of truth for this client.

Uses [Microsoft's typed-rest-client](https://github.com/microsoft/typed-rest-client). All requests are async functions.

## API Reference

See [Mailinator's API Reference](https://www.mailinator.com/documentation/docs/api/index.html) for all of the currently available API endpoints.

## Request Classes and Deprecations

For the list of available Request classes in this SDK, see [REFERENCE.md](REFERENCE.md).

Note that some of the Request classes are deprecated and will be removed in a future version. See [ROADMAP.md](ROADMAP.md) for more information.

## Usage examples

See [EXAMPLES.md](EXAMPLES.md) for more code examples on how to use the client.

## Development

#### Build tests

* `npm test`

#### Environment Configuration

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

By default, most of the tests are skipped. 

#### Build with tests

Most of the tests require env variables with valid values. Visit tests source code and review `EnabledIfEnvironmentVariable` wrapped parts. The more env variables you set, the more tests are run.

#### Create index

* Install https://www.npmjs.com/package/create-ts-index `npm install create-ts-index -g`
* Run `cti create .`

## Publishing Changes

1. Merge to main
2. Update version + tag (npm version patch|minor|major)
3. Push tags (git push --follow-tags)
4. Publish (npm publish)
