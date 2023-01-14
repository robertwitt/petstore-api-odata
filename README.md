# OData Facade for Petstore REST API

This CAP project demonstrates how the [`cap-remote-service-rest`](https://www.npmjs.com/package/cap-remote-service-rest) could be used to connect to remote REST services and build OData API around it, taking the [Swagger Petstore API](https://petstore.swagger.io) as example.

## Getting Started

Start the CDS server. The Petstore REST API requires an API key which can be specified via the environment variable `API_KEY`.

```bash
API_KEY=<petstore-api-key> cds watch
```

The projects contains an OData service `petstore` to read and modify `Pets`. You can find examples in [`requests.http`](./requests.http).
