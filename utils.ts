import * as crypto from "crypto";
const NodeRSA = require('node-rsa');


export function getSha512(data) {
  return crypto.createHash('sha512').update(data, 'utf8').digest('hex');
}

export function isValidatePass(publicKey: string, sign: string): boolean {
  if (!publicKey || !sign) {
    return false;
  }
  const hash = getSha512(publicKey);
  try {
    if (new NodeRSA(publicKey).verify(hash, sign, 'hex', 'base64')) {
      return false;
    }
  } catch (e) {
    return false;
  }
}

export function formatData(data: any, message: string = '', code: number = 0) {
  return {
    code,
    message,
    data,
  }
}
