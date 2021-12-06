import axios, { AxiosRequestConfig } from "axios";

const defaultConfig = {
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/api`,
};

export default class Api {
  static base_url = process.env.REACT_APP_API_BASE_URL;

  static get(
    url: string,
    params?: any,
    config: Partial<AxiosRequestConfig> = {},
  ) {
    return axios
      .get(url, {
        ...defaultConfig,
        ...config,
        params,
      })
      .then((response) => response.data);
  }

  static delete(
    url: string,
    params?: any,
    config: Partial<AxiosRequestConfig> = {},
  ) {
    return axios
      .delete(url, {
        ...defaultConfig,
        ...config,
        params,
      })
      .then((response) => response.data);
  }
}
