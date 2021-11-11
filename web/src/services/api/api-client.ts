class ApiClient {
  public makeGETRequest(url: string, queryParams: any) {
    return fetch(this.formatUrl(url, queryParams)).then(this.jsonResult);
  }

  public makePOSTRequest(url: string, queryParams: any, body: any) {
    return fetch(this.formatUrl(url, queryParams), {
      method: "POST",
      body: JSON.stringify(body || {}),
      headers: { "Content-Type": "application/json" },
    }).then(this.jsonResult);
  }

  public makeDELETERequest(url: string) {
    return fetch(this.formatUrl(url), {
      method: "DELETE",
    }).then(this.jsonResult);
  }

  public formatUrl(url: string, queryParams: any = {}) {
    return `/dashboard/api${url}?${this.getQueryString(queryParams)}`;
  }

  private jsonResult(res: any) {
    return res.json();
  }

  //Parse url query params from json to string
  private getQueryString(queryParams: any) {
    let queryString = "";
    for (let key in queryParams) {
      if (queryString !== "") {
        queryString += "&";
      }
      queryString += key + "=" + queryParams[key];
    }
    return queryString;
  }
}

export default new ApiClient();
