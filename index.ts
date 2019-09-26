import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as bluebird from "bluebird";
import * as mongoose from "mongoose";
import userRouter from "./routers/user";
import appConfig from "./appConfig";
import handleError from "./middleware/handleError";


bluebird.promisifyAll(mongoose);
mongoose.connect(appConfig.mongo.urls, appConfig.mongo.opts);
console.log('config', appConfig);
const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(handleError);
app.use(userRouter);

app.listen(appConfig.port, appConfig.listen, () => {
  console.log(`http://${appConfig.listen}:${appConfig.port}`);
});
