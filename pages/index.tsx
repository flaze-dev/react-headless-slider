import React, {Component, ReactNode} from "react";
import Page from "../core/Page";
import {Development} from "../lib";


/**
 * IndexPage Component
 * @author Ingo Andelhofs
 */
class IndexPage extends Component<never, never> {

  // Rendering
  public render(): ReactNode {
    return <Page style={{width: "100%", height: "100%"}}>
      <Development />
    </Page>;
  }
}

export default IndexPage;