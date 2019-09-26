# Encrypt My Message Server

## deployment

`docker-compose up -d`

## API

|   Method   |        API        |   Params   |   Remark   |
| :--- | :--- | :--- | :--- |
| `GET` | `/users` | Query: `{ hash: 'part of publick key hash' }` | Find all public keys |
| `POST` | `/users/register` | JSON: `{ publicKey: '', sign: 'publicKey SHA512 sign' }` | Register, tobe discover able |
| `POST` | `/users/:hash/messages` | JSON: `{ message: 'encrypt message' }` | Send message to hash user |
| `GET` | `/users/:hash/messages` | Query: `{ sign: 'hash SHA512 sign' }` | Get hash user's all messages |
| `DELETE` | `/users/:hash/messages` | JSON: `{ sign: 'hash SHA512 sign' }` | Get hash user's all message and delete |

