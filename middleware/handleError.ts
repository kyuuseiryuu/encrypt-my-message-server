import {formatData} from "../utils";
import {SystemStatusCode} from "../statusCode/system";

export default async (req, res, next) => {
  try {
    await next();
  } catch (e) {
    res.json(await formatData(null, e.message, SystemStatusCode.SYSTEM_ERROR));
  }
};
