import { Schema, model } from "mongoose";

const HashMessageModel = new Schema({
  createAt: {
    type: Number,
    default: () => Date.now(),
  },
  hash: {
    type: String,
    index: true,
  },
  message: String,
});

export default model('HashMessage', HashMessageModel);
