import {Response} from "express";
import {formatData} from "../utils";

export default async (req, res: Response) => {
  res.status(404);
  res.json(await formatData(null, 'method not found', 404))
}
