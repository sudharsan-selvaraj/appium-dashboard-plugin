var cp = require("child_process");
var B = require("bluebird");

const childScript = require.resolve(
  "/Users/sudharsanselvaraj/Documents/git/personal/appium-dashboard-plugin/lib/plugin/script-executor/script.js"
);

let driverOptions = {
  sessionId: "6f695ab1-5770-4821-86ca-98beddbde207",
  protocol: "http",
  hostname: "localhost",
  port: 4723,
  path: "/wd-internal",
  isW3C: true,
  isMobile: true,
  capabilities: {
    platformName: "Android",
    maxInstances: 1,
    platformVersion: "10",
    orientation: "PORTRAIT",
    automationName: "UiAutomator2",
    uiautomator2ServerInstallTimeout: 50000,
    app: "/Users/sudharsanselvaraj/Documents/git/personal/oss/appium-boilerplate/apps/Android-NativeDemoApp-0.4.0.apk",
    appWaitActivity: "com.wdiodemoapp.MainActivity",
    noReset: true,
    newCommandTimeout: 240,
    ensureWebviewsHavePages: true,
    nativeWebScreenshot: true,
    connectHardwareKeyboard: true,
  },
};

const scriptProc = cp.fork(childScript);
scriptProc.send({ driverOpts: driverOptions, script: "throw new Error()", timeoutMs: 50000 });

const waitForResult = async () => {
  const res = await new B((res) => {
    scriptProc.on("message", (data) => {
      res(data);
    }); // this is node IPC
  });

  if (res.error) {
    throw new Error(res.error.message);
  }

  return res.success;
};

(async () => {
  try {
    console.log(await waitForResult());
  } catch (err) {
    console.log(err);
  }
})();
