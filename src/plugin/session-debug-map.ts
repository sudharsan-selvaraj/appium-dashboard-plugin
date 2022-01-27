export interface ISessionMapDetails {
  is_paused: boolean;
}

export class SessionDebugMap {
  private sessionMap: Map<string, ISessionMapDetails> = new Map();

  public createNewSession(sessionId: string) {
    if (!this.sessionMap.get(sessionId)) {
      this.sessionMap.set(sessionId, { is_paused: false });
    }
  }

  public get(sessionId: string) {
    return this.sessionMap.get(sessionId);
  }

  public set(sessionId: string, data: Partial<ISessionMapDetails>) {
    let session = this.get(sessionId);
    if (session) {
      this.sessionMap.set(sessionId, {
        ...session,
        ...data,
      });
    }
  }
}

export default new SessionDebugMap();
