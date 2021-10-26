import React from "react";

export abstract class RouteReactiveComponent<T, U> extends React.Component<T, U> {
  protected abstract componentUpdated(): void;

  componentDidUpdate(preProps: any) {
    if (preProps.session && preProps.session.session_id != (this.props as any).session.session_id) {
      this.componentUpdated();
    }
  }
}
