import './bootstrap';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import userRouter from "./routers/user";
import appConfig from "./appConfig";
import handleNotFound from "./middleware/handleNotFound";

console.log('config', appConfig);

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(userRouter);
app.use(handleNotFound);

app.listen(appConfig.port, appConfig.listen, () => {
  console.log(`http://${appConfig.listen}:${appConfig.port}`);
});
