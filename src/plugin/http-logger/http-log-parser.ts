import _ from "lodash";

class NetworkLogsParser {
  private logs: Record<string, any> = {};

  constructor(private context: string) {}

  public onRequestRecieved(event: any) {
    const { requestId } = event;
    this.logs[requestId] = {
      ...this.getParsedRequest(event),
      response_received: false,
    };
  }

  public onResponseRecieved(event: any) {
    const { requestId } = event;
    if (this.logs[requestId]) {
      this.logs[requestId] = _.assign(this.logs[requestId], this.getParsedResponse(event), {
        response_received: true,
      });
    }
  }

  public getLogs() {
    return Object.values(this.logs).filter((l) => l.response_received);
  }

  private getParsedRequest(event: any) {
    let {
      request: { url, method, headers: request_headers, postData: request_post_data },
      type: request_type,
    } = event;
    return {
      url,
      method,
      request_headers,
      request_post_data,
      request_content_type: request_post_data ? request_headers["Content-Type"] : undefined,
      request_type,
      context: this.context,
      start_time: new Date(),
    };
  }

  private getParsedResponse(event: any) {
    let {
      response: {
        status: response_status,
        statusText: response_status_text,
        headers: response_headers,
        mimeType: response_content_type,
        remoteIPAddress: remote_ip_address,
      },
      responseBody: response_body,
    } = event;
    return {
      response_status,
      response_status_text,
      response_headers,
      response_content_type,
      response_body,
      remote_ip_address,
      end_time: new Date(),
    };
  }
}

export { NetworkLogsParser };
