import { ISessionFilterQuery } from "../interfaces/filters";
import Api from "./index";
import { AxiosResponse } from "axios";

type ListResponse = {
  result: {
    count: number;
    rows: any[];
  };
};

export default class SessionApi {
  public static getAllSessions(
    filterParams?: Record<string, string>,
  ): Promise<ListResponse> {
    return Api.get("/sessions", filterParams || {});
  }

  public static getTextLogsForSession(
    sessionId: string,
  ): Promise<ListResponse> {
    return Api.get(`/sessions/${sessionId}/logs/text`, {});
  }

  public static getDeviceLogsForSession(
    sessionId: string,
  ): Promise<ListResponse> {
    return Api.get(`/sessions/${sessionId}/logs/device`, {});
  }

  public static getDebugLogsForSession(
    sessionId: string,
  ): Promise<ListResponse> {
    return Api.get(`/sessions/${sessionId}/logs/debug`, {});
  }

  public static getSessionById(sessionId: string) {
    return Api.get(`/sessions/${sessionId}`, {});
  }

  public static deleteSessionById(sessionId: string) {
    return Api.delete(`/sessions/${sessionId}`);
  }

  public static getSessionTextLogs(sessionId: string) {
    return Api.get(`/sessions/${sessionId}/logs/text`, {});
  }
}
