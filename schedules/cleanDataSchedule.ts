import * as schedule from 'node-schedule';
import HashMessageModel from "../models/HashMessageModel";
import * as moment from 'moment';
import appConfig from "../appConfig";

schedule.scheduleJob('* 24 * * * *', async () => {
  const time = moment().add(appConfig.dataMaxSaveDays, 'days').toDate().getTime();
  const result = await HashMessageModel.deleteMany({
    createAt: {
      $lt: time,
    }
  });
  console.log('cleanDataSchedule:', result);
});
