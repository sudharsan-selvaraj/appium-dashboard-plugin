import { Router, Request } from "express";
import { Config } from "../config";

export interface IExpressController {
  initializeRoutes(router: Router, config: Config): void;
}

export interface IExpressRequest extends Request {
  parsedQuery?: any;
}
