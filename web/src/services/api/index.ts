import apiClient from "./api-client";

class ApiService {
  public static getAllSessions() {
    return apiClient.makeGETRequest("/sessions", {});
  }

  public static getTextLogsForSession(sessionId: string) {
    return apiClient.makeGETRequest(`/sessions/${sessionId}/logs/text`, {});
  }

  public static getDeviceLogsForSession(sessionId: string) {
    return apiClient.makeGETRequest(`/sessions/${sessionId}/logs/device`, {});
  }

  public static getDebugLogsForSession(sessionId: string) {
    return apiClient.makeGETRequest(`/sessions/${sessionId}/logs/debug`, {});
  }

  public static getSessionById(sessionId: string) {
    return apiClient.makeGETRequest(`/sessions/${sessionId}`, {});
  }

  public static deleteSessionById(sessionId: string) {
    return apiClient.makeDELETERequest(`/sessions/${sessionId}`);
  }

  public static getSessionTextLogs(sessionId: string) {
    return apiClient.makeGETRequest(`/sessions/${sessionId}/logs/text`, {});
  }

  public static getVideoForSession(sessionId: string) {
    return apiClient.formatUrl(`/sessions/${sessionId}/video`);
  }

  public static getScreenshotForLog(sessionId: string, logId: string) {
    return apiClient.formatUrl(`/sessions/${sessionId}/log/${logId}/screen-shot`);
  }
}

export { ApiService };
