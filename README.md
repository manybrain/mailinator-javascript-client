# Mailinator JavaScript SDK

The official Mailinator JavaScript SDK.

Uses [Microsoft's typed-rest-client](https://github.com/microsoft/typed-rest-client). All requests are async functions.

## API Reference

See [Mailinator's API Reference](https://www.mailinator.com/documentation/docs/api/) for all of the currently available API endpoints.

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
