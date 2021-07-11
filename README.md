# express-typescript-classStyle-template

## bodyparser is deprecated

```typescript
app.use(bodyparser.json());
app.use(bodyParser.urlencoded({ extended: true }));
```

- 아래방법으로 변경

```typescript
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
```

## wsl2에서 nodemon이 작동안하는 문제

- nodemon 앞에 CHOKIDAR_USEPOLLING=true 를 붙인다.

```json
  "scripts": {
    "build": "tsc",
    "local": "CHOKIDAR_USEPOLLING=true nodemon --watch src --delay 1 --exec ts-node ./src/server.ts"
  },
```
