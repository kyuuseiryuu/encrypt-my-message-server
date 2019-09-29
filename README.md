# Encrypt My Message Server

## 基本想法
> 这是一个提供公钥列表和加密消息暂存的服务，任何一个人可以自由部署或各自实现。  
> 这个项目没有复杂高深的地方，就是提供一个简单数据暂存的服务而已。
1. 任何人可以将公钥发布在此服务上，但为了证明该公钥确实属于你个人，需要提供该公钥 SHA512 哈希的签名。  
2. 你可以通过任何方式发送你的公钥哈希给任何人，这不是什么秘密。
3. 任何人可以通过你发布的公钥哈希在此服务上获取你的公钥。
4. 任何人可以通过你的公钥加密消息，并通过你的公钥哈希将该加密消息发送到此服务上。
5. 你可以用你的公钥哈希取回别人发给你的加密消息。

## 其他思考（自问自答）
Q: 取回消息是否需要验证身份？  
A: 也许可以不用，因为即使被读取到但没有你的私钥，别人也是无法解密你的消息的。  

Q: 取回消息后是否要删除消息？  
A: 取回消息不立即删除，删除还是显示请求更好。删除还需要验证身份。  

Q: 消息要不要定时清理？  
A: 首先发布消息没有限制，各个服务器能承受的压力不同，所以应该要有所限制。
其次，还是为了保证安全性和这个项目的基本想法，仅暂存消息，所以也应该定时清理，具体实现，各自权衡吧。

## 部署

`docker-compose up -d`

## 已实现 API

|   Method   |        API        |   Params   |   Remark   |
| :--- | :--- | :--- | :--- |
| `GET` | `/users` | Query: `{ hash: '公钥哈希的某一部分' }` | 获取公钥列表或查询公钥 |
| `POST` | `/users/register` | JSON: `{ publicKey: '', sign: '公钥 SHA512 哈希签名' }` | 注册到此服务 |
| `POST` | `/users/:hash/messages` | JSON: `{ message: 'Base64 格式的加密消息' }` | 发送加密消息给此哈希对应的公钥 |
| `GET` | `/users/:hash/messages` | Query: `{ sign: '公钥 SHA512 哈希签名' }` | 获取此哈希所对应公钥的所有消息 |
| `DELETE` | `/users/:hash/messages` | JSON: `{ sign: '公钥 SHA512 哈希签名' }` | 获取此哈希所对应公钥的所有消息并删除 |

