import {Router} from 'express';
import {findAll, findPubKeyWithHash} from "../business/KeyHash";
import {formatData, getSha512, isValidatePass} from "../utils";
import {getMessages, postMessage} from "../business/HashMessage";
import KeyHashModel from "../models/KeyHashModel";
import HashMessageModel from "../models/HashMessageModel";

const userRouter = Router();

userRouter.get('/users', async (req, res) => {
  const { hash } = req.query;
  res.json(formatData(await findAll(hash)));
});

userRouter.post('/users/register', async (req, res) => {
  const { publicKey = '', sign = '' } = req.body;
  const hash = getSha512(publicKey);
  const verifyPass = isValidatePass(publicKey, sign);
  if (verifyPass) {
    await findPubKeyWithHash(hash, publicKey);
  }
  console.log('register', { publicKey, verifyPass });
  res.json(formatData({ verifyPass, hash }));
});

userRouter.post('/users/:hash/messages', async (req, res) => {
  const { hash } = req.params;
  const { message = '' } = req.body;
  res.json(formatData(await postMessage(hash, message)));
});

userRouter.get('/users/:hash/messages', async (req, res) => {
  const { hash } = req.params;
  const { sign } = req.query;
  const keyHash = await KeyHashModel.findOne({ hash });
  const keyHashObj = keyHash.toObject({ virtuals: true, versionKey: false });
  const data = await getMessages(hash);
  res.json(formatData(data));
});

userRouter.delete('/users/:hash/messages', async (req, res) => {
  const { hash } = req.params;
  const keyHash = await KeyHashModel.findOne({ hash }).exec();
  const data = await getMessages(hash);
  await HashMessageModel.deleteMany({ hash });
  res.json(formatData(data));
});

export default userRouter;
