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

  public static getSessionById(sessionId: string) {
    return apiClient.makeGETRequest(`/sessions/${sessionId}`, {});
  }

  public static getSessionTextLogs(sessionId: string) {
    return apiClient.makeGETRequest(`/sessions/${sessionId}/logs/text`, {});
  }
}

export { ApiService };
