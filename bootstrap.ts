import * as bluebird from "bluebird";
import * as mongoose from "mongoose";
import appConfig from "./appConfig";
import './schedules/cleanDataSchedule';
bluebird.promisifyAll(mongoose);
mongoose.connect(appConfig.mongo.urls, appConfig.mongo.opts);
