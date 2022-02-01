const CDP = require("chrome-remote-interface");

async function example() {
  let client;
  try {
    // connect to endpoint
    client = await CDP({
      port: 60234,
      local: true,
      //protocol: require("/Users/sudharsanselvaraj/Documents/git/personal/appium-dashboard-plugin/node_modules/chrome-remote-interface/lib/protocol.json"),
    });
    // extract domains
    const { Network, Page } = client;
    // setup handlers
    Network.requestWillBeSent((params) => {
      console.log(params);
    });
    // enable events then start!
    await Network.enable();
    // await Page.enable();
    //await Page.navigate({ url: "https://github.com" });
    // await Page.loadEventFired();
    await new Promise((res) => {
      setTimeout(res, 10000);
    });
  } catch (err) {
    console.error(err);
  } finally {
    if (client) {
      await client.close();
    }
    console.log("finaly");
  }
}

(async () => {
  await example();
})();
