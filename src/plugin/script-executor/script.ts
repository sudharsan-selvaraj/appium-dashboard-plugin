import _ from "lodash";
import B from "bluebird";
import { NodeVM } from "vm2";
import { logger, util } from "@appium/support";
import { attach } from "webdriverio";

const log = logger.getLogger("ExecuteDriver Child");
let send: any;

async function runScript(driverOpts: any, script: string, timeoutMs: number) {
  if (!_.isNumber(timeoutMs)) {
    throw new TypeError("Timeout parameter must be a number");
  }

  // set up fake logger
  const logLevels = ["error", "warn", "log"];
  const logs: any = [];
  const consoleFns: any = {};
  for (const level of logLevels) {
    consoleFns[level] = (...logMsgs: any[]) => logs.push({ level, message: [...logMsgs].map(parseLogMessage) });
  }

  const driver = await attach(driverOpts);

  const fullScript = buildScript(script);

  log.info("Running driver script in Node vm");

  const vmCtx = new NodeVM({ timeout: timeoutMs });
  const vmFn = vmCtx.run(fullScript);

  // run the driver script, giving user access to the driver object, a fake
  // console logger, and a promise library
  let result = await vmFn(driver, consoleFns, B);
  //result = coerceScriptResult(result);
  log.info("Successfully ensured driver script result is appropriate type for return");
  return { result, logs };
}

function parseLogMessage(log: any) {
  if (log instanceof Error) {
    return {
      message: log.message,
      stack: log.stack,
    };
  }
  return log;
}

/**
 * Embed a user-generated script inside a method which takes only the
 * predetermined objects we specify
 *
 * @param {string} script - the javascript to execute
 *
 * @return {string} - the full script to execute
 */
function buildScript(script: string) {
  return `module.exports = async function execute (driver, console, Promise) {
    ${script}
  }`;
}

async function main(driverOpts: any, script: string, timeoutMs: number) {
  let res;
  try {
    let { result, logs }: any = await runScript(driverOpts, script, timeoutMs);
    if (result instanceof Error) {
      result = { error: true, message: result.message, stack: result.stack };
    }
    res = { result, logs };
  } catch (error: any) {
    console.log(error);
    res = { result: { error: true, message: error.message, stack: error.stack } };
  }
  await send({
    data: res,
  });
}

// ensure we're running this script in IPC mode
if (require.main === module && _.isFunction(process.send)) {
  send = B.promisify(process.send, { context: process });
  log.info("Running driver execution in child process");
  process.on("message", ({ driverOpts, script, timeoutMs }) => {
    log.info("Parameters received from parent process");
    main(driverOpts, script, timeoutMs);
  });
}
