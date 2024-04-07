# Easy CORS Proxy

## Introduction

Easy CORS Proxy is a lightweight HTTP server designed to simplify Cross-Origin Resource Sharing (CORS) issues encountered during web development. CORS restrictions often prevent web applications from accessing resources hosted on different domains due to security concerns. This proxy facilitates seamless communication between web applications and external resources by bypassing CORS restrictions.

## Features

- **App Version Endpoint**: Retrieve the version of the Easy CORS Proxy application.
- **Service Status Endpoint**: Check the operational status of the Easy CORS Proxy service.
- **Bypass CORS Proxy**: Utilize the proxy to access resources from external domains by providing the target URL and access token.

## Endpoints

### Show App Version

This endpoint allows you to retrieve the current version of the Easy CORS Proxy application.

```
GET /
```

### Show Service Status

Use this endpoint to check the operational status of the Easy CORS Proxy service.

```
GET /status
```

### Bypass CORS Proxy

With this endpoint, you can bypass CORS restrictions by specifying the target URL and access token. The proxy will fetch the requested resource from the external domain and return it to the client.

```
GET /proxy?URL=xxx&ACCESS_TOKEN=xxx
```

## Disclaimer

Please use the Easy CORS Proxy responsibly and ensure compliance with all applicable laws and regulations when accessing external resources. The developers are not responsible for any misuse of the proxy.