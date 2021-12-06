export const BASE_URL = "/";

export const SESSION_DETAILS = "session/:id";
export const getSessionDetailsUrl = (id: string) => {
  return `/session/${id}`;
};
