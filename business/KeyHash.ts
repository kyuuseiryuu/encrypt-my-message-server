import KeyHashModel from "../models/KeyHashModel";

export async function findPubKeyWithHash(hash: string, publicKey: string) {
  return KeyHashModel
    .findOneAndUpdate({ hash }, { hash, publicKey }, { upsert: true, new: true });
}

export async function findAll(hashLike: string = '') {
  return await KeyHashModel.aggregate()
    .match({ hash: { $regex: new RegExp(`.*${hashLike}.*`) }})
    .project('-_id -__v')
    .exec();
}
