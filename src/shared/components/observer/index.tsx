import { Component, ReactNode } from "react";

interface BaseProps {
  children: (ref: any) => ReactNode;
}

export interface ObserverInterface {
  disconnect: () => void;
  observe: (element: Element, options?: { [key: string]: any }) => void;
}

export class Observer<Props extends BaseProps> extends Component<Props> {
  protected name: string = "Observer";
  protected childNode: null | Element = null;
  protected observer: null | ObserverInterface = null;

  componentDidMount() {
    if (this.childNode === null) {
      throw new Error(`${this.name} did not receive a ref`);
    }
  }

  componentWillUnmount() {
    if (this.observer !== null) {
      this.observer.disconnect();
    }
  }

  updateChildNode = (ref: Element) => {
    if (this.childNode === ref) return; // node hasn't changed

    // if there's an existing observer disconnect it
    if (this.observer !== null) {
      this.observer.disconnect();
      this.observer = null;
    }

    this.childNode = ref;

    if (this.childNode !== null) {
      this.beginObserve();
    }
  };

  beginObserve: () => void = () => {
    throw new Error("Observer has no default observation method");
  };

  render() {
    const { children }: BaseProps = this.props;
    return children(this.updateChildNode);
  }
}
