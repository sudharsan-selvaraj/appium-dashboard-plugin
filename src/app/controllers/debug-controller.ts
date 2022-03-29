import { NextFunction, Router, Request, Response } from "express";
import { EventEmitter } from "events";
import { BaseController } from "../commons/base-controller";
import { Config } from "../../config";
import { defer } from "../utils/common-utils";
import SessionDebugMap from "../../plugin/session-debug-map";
import { Session } from "../../models";

export class DebugController extends BaseController {
  constructor(private debugEventEmitter: EventEmitter) {
    super();
  }

  public initializeRoutes(router: Router, config: Config) {
    router.use("/:sessionId/*", async (request, response, next) => {
      let { sessionId } = request.params;
      let session = await Session.findOne({
        where: {
          session_id: sessionId,
        },
      });
      if (!SessionDebugMap.get(sessionId) || !session) {
        return this.sendFailureResponse(response, "Invalid sessionid");
      }

      if (session.is_completed) {
        return this.sendFailureResponse(response, "Cannot perform this operation for completed session");
      }
      return next();
    });
    router.post("/:sessionId/execute_driver_script", this.executeDriverScript.bind(this));
    router.post("/:sessionId/:state", this.changeSessionState.bind(this));
  }

  private async triggerAndWaitForEvent(opts: { sessionId: string; eventObj: any }) {
    const deferred = defer();
    this.debugEventEmitter.emit(opts.sessionId, {
      ...opts.eventObj,
      callback: deferred.resolve,
    });
    return await deferred.promise;
  }

  public async changeSessionState(request: Request, response: Response, next: NextFunction) {
    let { sessionId, state } = request.params;

    if (!state.match("play|pause")) {
      return this.sendFailureResponse(response, "Invalid state. Supported states are play,pause");
    }

    await this.triggerAndWaitForEvent({
      sessionId,
      eventObj: {
        event: "change_state",
        state,
      },
    });

    return this.sendSuccessResponse(response, "Changed session state");
  }

  public async executeDriverScript(request: Request, response: Response, next: NextFunction) {
    let { sessionId } = request.params;
    let { script } = request.body;
    if (!script) {
      return this.sendFailureResponse(response, "please provide a valid script to execute");
    }

    let output = await this.triggerAndWaitForEvent({
      sessionId,
      eventObj: {
        event: "execute_driver_script",
        script,
      },
    });

    return this.sendSuccessResponse(response, output);
  }
}
