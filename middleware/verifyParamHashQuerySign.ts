import {NextFunction, Request, Response} from "express";
import KeyHashModel from "../models/KeyHashModel";
import {formatData, isValidatePass} from "../utils";
import {UserStatusCodeEnum} from "../statusCode/user";

export default async (req: Request, res: Response, next: NextFunction) => {
  const { hash } = req.params;
  const { sign } = req.query;
  const keyHash = await KeyHashModel.findOne({ hash }).exec();
  const keyHashObj = keyHash.toObject();
  if (!isValidatePass(keyHashObj.publicKey, sign)) {
    res.json(formatData([], 'sign error', UserStatusCodeEnum.SIGN_CHECK_ERROR));
    return;
  }
  await next();
};
