import { MockServer } from "jest-mock-server";

class FakeDriver {
  public opts: any;
  public mockRoutes: Map<string, jest.Mock<any>> = new Map();
  constructor(private config: { mockserver: MockServer; sessionId: string }) {
    this.initializeMockServer();
  }

  public async startServer() {
    await this.config.mockserver.start();
    this.opts = {
      address: this.config.mockserver.getURL().hostname || "localhost",
      port: this.config.mockserver.getURL().port,
      basePath: "",
    };
  }

  public async stopServer() {
    await this.config.mockserver.stop();
  }

  public getMock(mockName: string): jest.Mock<any> | undefined {
    return this.mockRoutes.get(mockName);
  }

  private initializeMockServer() {
    let defaultResponse = {
      status: 200,
      body: {
        value: "",
      },
    };
    this.addMock({
      mockName: "start_screen_recording",
      method: "post",
      url: "/session/:sessionId/appium/start_recording_screen",
      ctx: defaultResponse,
    });

    this.addMock({
      mockName: "screenshot",
      method: "get",
      url: "/session/:sessionId/screenshot",
      ctx: defaultResponse,
    });

    this.addMock({
      mockName: "stop_screen_recording",
      method: "post",
      url: "/session/:sessionId/appium/stop_recording_screen",
      ctx: defaultResponse,
    });

    this.addMock({
      mockName: "terminate",
      method: "delete",
      url: "/session/:sessionId/",
      ctx: defaultResponse,
    });
  }

  private addMock(opts: {
    mockName: string;
    method: "get" | "post" | "delete";
    url: string;
    ctx: {
      status: number;
      body: any;
    };
  }) {
    let mockPath = this.config.mockserver[opts.method](opts.url).mockImplementation((ctx) => {
      ctx.status = opts.ctx.status;
      ctx.body = opts.ctx.body;
    });
    this.mockRoutes.set(opts.mockName, mockPath);
  }
}

export { FakeDriver };
