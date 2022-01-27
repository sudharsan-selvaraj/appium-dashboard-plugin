import Asynclock from "async-lock";
import waitUntil from "async-wait-until";
import sessionDebugMap from "./session-debug-map";

const asyncLock = new Asynclock();

function getSessionIdFromUr(url: string) {
  const SESSION_ID_PATTERN = /\/session\/([^/]+)/;
  const match = SESSION_ID_PATTERN.exec(url);
  if (match) {
    return match[1];
  }
  return null;
}

async function waitForSessionToResume(sessionId: string) {
  await asyncLock.acquire(`${sessionId}_debug`, async () => {
    await waitUntil(
      () => {
        return sessionDebugMap.get(sessionId)?.is_paused == false;
      },
      {
        timeout: 300000, //5 minutes denoted in milliseconds
        intervalBetweenAttempts: 2000,
      }
    );
  });
}

function isSessionPaused(sessionId: string) {
  return sessionDebugMap.get(sessionId) && sessionDebugMap.get(sessionId)?.is_paused == true;
}

async function handler(req: any, res: any, next: any) {
  if (!!req.query.internal || new RegExp(/dashboard\//).test(req.url)) {
    return next();
  }

  let sessionId = getSessionIdFromUr(req.url);

  if (sessionId && isSessionPaused(sessionId)) {
    await waitForSessionToResume(sessionId);
  }
  return next();
}

function registerDebugMiddlware(expressApp: any) {
  let index = expressApp._router.stack.findIndex((s: any) => s.route);
  expressApp.use("/", handler);
  expressApp._router.stack.splice(index, 0, expressApp._router.stack.pop());
}

export { registerDebugMiddlware };
