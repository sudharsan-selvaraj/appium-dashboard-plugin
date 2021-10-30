export default class CommonUtils {
  public static convertTimeToReadableFormat(startDate: Date, endDate: Date) {
    let seconds = Math.round((endDate.getTime() - startDate.getTime()) / 1000);
    if (seconds <= 0) {
      return `${Math.round(endDate.getTime() - startDate.getTime())} ms`;
    }
    var levels: any = [
      [Math.floor(seconds / 31536000), "years"],
      [Math.floor((seconds % 31536000) / 86400), "days"],
      [Math.floor(((seconds % 31536000) % 86400) / 3600), "hrs"],
      [Math.floor((((seconds % 31536000) % 86400) % 3600) / 60), "mins"],
      [(((seconds % 31536000) % 86400) % 3600) % 60, "secs"],
    ];
    var returntext = "";

    for (var i = 0, max = levels.length; i < max; i++) {
      if (levels[i][0] === 0) continue;
      returntext +=
        " " +
        levels[i][0] +
        " " +
        (levels[i][0] === 1 ? levels[i][1].substr(0, levels[i][1].length - 1) : levels[i][1]);
    }
    return returntext.trim();
  }
}
