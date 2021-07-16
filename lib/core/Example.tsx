import React, {Component, ReactNode} from "react";


interface Props {}

interface State {}


/**
 * Example Component
 * @author Ingo Andelhofs
 */
class Example extends Component<Props, State> {

  // Rendering
  public render(): ReactNode {
    return <h1>Example</h1>;
  }
}

export default Example;