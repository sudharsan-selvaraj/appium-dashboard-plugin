import { Router, Request } from "express";

export interface IExpressController {
  initializeRoutes(router: Router, config: any): void;
}

export interface IExpressRequest extends Request {
  parsedQuery?: any;
}
