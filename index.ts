import './bootstrap';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import userRouter from "./routers/user";
import appConfig from "./appConfig";
import handleError from "./middleware/handleError";
import { formatData } from "./utils";
import { SystemStatusCode } from "./statusCode/system";

console.log('config', appConfig);
const app = express();

process.on('unhandledRejection', (error) => {
  app.response.json(formatData(error, 'error', SystemStatusCode.SYSTEM_ERROR));
});

app.use(handleError);
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(userRouter);

app.listen(appConfig.port, appConfig.listen, () => {
  console.log(`http://${appConfig.listen}:${appConfig.port}`);
});
