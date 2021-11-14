import { Request } from "express";

export class ExpressUtils {
  public static getUrl(request: Request) {
    return request.protocol + "://" + request.get("host") + request.originalUrl.split("?")[0];
  }
}
