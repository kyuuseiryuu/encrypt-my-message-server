import HashMessageModel from "../models/HashMessageModel";

export async function getMessages(hash: string) {
  return await HashMessageModel
    .aggregate()
    .match({ hash })
    .sort('-_id')
    .project('-_id -__v')
    .exec();
}

export async function postMessage(hash: string, message: string) {
  return await HashMessageModel.create({ hash, message });
}
