# Backend: ExpressJS

| app         | host      | port |
| ----------- | --------- | ---- |
| **express** | localhost | 5000 |

<br />

### Config env file

```shell
cp .env.example .env
```

Edit .env file
```shell
port=<your_port>
mongoURI=<your_mongoDB_Atlas_uri_with_credentials>
jwtSecret=<your_secret_key>
```

### Uso

#

Serve
```shell
npm run server
```

Lint
```shell
npm run lint
```

Lint fix
```shell
npm run lint:fix
```
