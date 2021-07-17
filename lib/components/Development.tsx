import React, {Component, ReactNode} from "react";
import PointerEventManager, {ExtendedPointerEvent} from "../utils/PointerEventManager";


interface Props {}

interface State {}


/**
 * Development Component
 * @author Ingo Andelhofs
 */
class Development extends Component<Props, State> {

  private ref = React.createRef<HTMLDivElement>();

  // Lifecycle
  public componentDidMount() {

    const manager = new PointerEventManager<HTMLDivElement>(this.ref.current!);

    manager.on("pointerdown", (event: ExtendedPointerEvent) => {
      console.log("move", event.percentages(this.ref.current!));
    });
  }

  // Rendering
  public render(): ReactNode {
    return <div
      ref={this.ref}
      style={{width: "100%", height: "100%", background: "#e3e3e3"}}
    />;
  }
}

export default Development;
