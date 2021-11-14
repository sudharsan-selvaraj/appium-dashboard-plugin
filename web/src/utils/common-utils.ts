import api from "../api";

export default class CommonUtils {
  public static convertTimeToReadableFormat(startDate: Date, endDate: Date) {
    const seconds = Math.round(
      (endDate.getTime() - startDate.getTime()) / 1000,
    );
    if (seconds <= 0) {
      return `${Math.round(endDate.getTime() - startDate.getTime())} ms`;
    }
    const levels: any = [
      [Math.floor(seconds / 31536000), "years"],
      [Math.floor((seconds % 31536000) / 86400), "days"],
      [Math.floor(((seconds % 31536000) % 86400) / 3600), "hrs"],
      [Math.floor((((seconds % 31536000) % 86400) % 3600) / 60), "mins"],
      [(((seconds % 31536000) % 86400) % 3600) % 60, "secs"],
    ];
    let returntext = "";

    for (let i = 0, max = levels.length; i < max; i++) {
      if (levels[i][0] === 0) continue;
      returntext +=
        " " +
        levels[i][0] +
        " " +
        (levels[i][0] === 1
          ? levels[i][1].substr(0, levels[i][1].length - 1)
          : levels[i][1]);
    }
    return returntext.trim();
  }

  public static filterSessionList(sessions: any[], filter: any) {
    const filters: any = [];
    if (filter.name) {
      filters.push(
        (session: any) =>
          session.session_id.indexOf(filter.name) >= 0 ||
          session.name?.toLowerCase().indexOf(filter.name.toLowerCase()) >= 0,
      );
    }
    if (filter.os) {
      filters.push(
        (session: any) =>
          session.platform_name.toLowerCase() == filter.os.toLowerCase(),
      );
    }

    if (filter.status) {
      filters.push(
        (session: any) =>
          session.session_status.toLowerCase() == filter.status.toLowerCase(),
      );
    }

    if (filter.device_udid) {
      filters.push(
        (session: any) =>
          session.udid
            ?.toLowerCase()
            .indexOf(filter.device_udid.toLowerCase()) >= 0,
      );
    }

    return filters.reduce((acc: any, filter: any) => {
      return acc.filter(filter);
    }, sessions);
  }

  static getVideoForSession(sessionId: string) {
    return `${api.base_url}/api/sessions/${sessionId}/video`;
  }

  static getScreenshotForLog(sessionId: string, logId: string) {
    return `${api.base_url}/sessions/${sessionId}/log/${logId}/screen-shot`;
  }
}
