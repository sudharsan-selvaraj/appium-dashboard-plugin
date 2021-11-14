import { Request, Response, Router } from "express";
import { IExpressController, IExpressRequest } from "../../interfaces/express-controller";
import { ExpressUtils } from "../utils/express-utils";

export abstract class BaseController implements IExpressController {
  abstract initializeRoutes(router: Router, config: any): void;

  public sendPaginatedResponse(result: { rows: any[]; count: number }, request: IExpressRequest, response: Response) {
    if (request.parsedQuery.paginate == true) {
      response.status(200).send({
        success: true,
        count: result.count,
        prev: this.getPreviousUrl(request, result.count),
        next: this.getNextUrl(request, result.count),
        result: result.rows,
      });
    } else {
      this.sendSuccessResponse(response, result.rows);
    }
  }

  public sendSuccessResponse(response: Response, result: any, statusCode: number = 200) {
    response.status(statusCode).send({
      success: true,
      result: result,
    });
  }

  public sendFailureResponse(response: Response, result: any, statusCode: number = 500) {
    response.status(statusCode).send({
      success: false,
      message: result,
    });
  }

  private getNextUrl(request: Request, count: number): string | null {
    if (count <= parseInt(request.query.page as any) * parseInt(request.query.page_size as any)) {
      return null;
    }
    var nextPage = parseInt(request.query.page as any) + 1;
    return this.getPaginationApiUrl(request, nextPage);
  }

  private getPreviousUrl(request: Request, count: number): string | null {
    if (parseInt(request.query.page as any) == 1 || count == 0) {
      return null;
    }
    let prevPage = parseInt(request.query.page as any) - 1;
    if (count <= parseInt(request.query.page_size as any)) {
      prevPage = 1;
    }
    return this.getPaginationApiUrl(request, prevPage);
  }

  private getPaginationApiUrl = function (request: Request, page: number) {
    let baseUrl = ExpressUtils.getUrl(request),
      queryString = "?paginate=true";
    for (let param in request.query) {
      if (request.query.hasOwnProperty(param)) {
        if (param == "page") {
          queryString = `${queryString}&page=${page}`;
        } else if (param != "paginate") {
          queryString = `${queryString}&${param}=${request.query[param]}`;
        }
      }
    }
    return baseUrl + queryString;
  };
}
