import { log } from "./logger";

function createSession(driver: any, args: any[], response: any) {
  return {
    title: "CREATED NEW SESSION",
    title_info: response.session_id,
    response: null,
    params: null,
  };
}

function deleteSession(driver: any, args: any[], response: any) {
  return {
    title: "CLIENT DELETED THE SESSION",
    title_info: args[0],
    response: null,
    params: null,
  };
}

export { createSession, deleteSession };
