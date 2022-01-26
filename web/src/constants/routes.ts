export const BASE_URL = process.env.REACT_APP_API_BASE_URL
  ? new URL(process.env.REACT_APP_API_BASE_URL).pathname
  : "";

export const SESSION_DETAILS = "session/:id";
export const getSessionDetailsUrl = (id: string) => {
  return `${BASE_URL}/session/${id}`;
};
