import {Router} from 'express';
import {findAll, findPubKeyWithHash} from "../business/KeyHash";
import {formatData, getSha512, isValidatePass} from "../utils";
import {getMessages, postMessage} from "../business/HashMessage";
import HashMessageModel from "../models/HashMessageModel";
import checkParamHashRegister from "../middleware/checkParamHashRegister";
import verifyParamHashQuerySign from "../middleware/verifyParamHashQuerySign";

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

userRouter.post('/users/:hash/messages', checkParamHashRegister, async (req, res) => {
  const { hash } = req.params;
  const { message = '' } = req.body;
  res.json(formatData(await postMessage(hash, message)));
});

userRouter.get('/users/:hash/messages', checkParamHashRegister, verifyParamHashQuerySign, async (req, res) => {
  const { hash } = req.params;
  const data = await getMessages(hash);
  res.json(formatData(data));
});

userRouter.delete('/users/:hash/messages', checkParamHashRegister, verifyParamHashQuerySign , async (req, res) => {
  const { hash } = req.params;
  const data = await getMessages(hash);
  await HashMessageModel.deleteMany({ hash });
  res.json(formatData(data));
});

export default userRouter;
