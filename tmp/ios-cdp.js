const profiler = require("../lib/plugin/network-profiler/ios-network-profiler-backup").IosNetworkProfiler;
const pr = new profiler({
  uuid: "573694D2-2B49-4307-B344-26C4CAE74A37",
});

(async () => {
  console.log(await pr.start());
})();
