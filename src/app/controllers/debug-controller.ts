import { NextFunction, Router, Request, Response } from "express";
import { EventEmitter } from "events";
import { BaseController } from "../commons/base-controller";
import { Config } from "../../config";

export class DebugController extends BaseController {
  constructor(private debugEventEmitter: EventEmitter) {
    super();
  }

  public initializeRoutes(router: Router, config: Config) {
    router.post("/:sessionId/:state", this.changeSessionState.bind(this));
  }

  public async changeSessionState(request: Request, response: Response, next: NextFunction) {
    let { sessionId, state } = request.params;
    if (!state.match("play|pause")) {
      return this.sendFailureResponse(response, "Invalid state. Supported states are play,pause");
    }
    this.debugEventEmitter.emit(sessionId, {
      event: "change_state",
      state,
    });
    return this.sendSuccessResponse(response, "Changed session state");
  }
}
