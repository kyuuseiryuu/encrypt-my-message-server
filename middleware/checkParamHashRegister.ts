import {NextFunction, Request, Response} from "express";
import KeyHashModel from "../models/KeyHashModel";
import {formatData} from "../utils";
import {UserStatusCodeEnum} from "../statusCode/user";

export default async (req: Request, res: Response, next: NextFunction) => {
  const { hash } = req.params;
  const keyHash = await KeyHashModel.findOne({ hash }).exec();
  if (!keyHash) {
    res.json(formatData([], 'unregister', UserStatusCodeEnum.UNREGISTER));
    return;
  }
  await next();
};
