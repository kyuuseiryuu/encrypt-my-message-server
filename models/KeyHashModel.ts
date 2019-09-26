import { Schema, model } from 'mongoose';

const KeyHashModel = new Schema({
  hash: {
    type: String,
    index: true,
  },
  publicKey: {
    type: String,
    index: true,
  },
});


export default model('KeyHash', KeyHashModel);
