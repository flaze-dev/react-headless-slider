import React, {Component, ReactNode} from "react";
import Page from "../core/Page";


/**
 * IndexPage Component
 * @author Ingo Andelhofs
 */
class IndexPage extends Component<never, never> {

  // Rendering
  public render(): ReactNode {
    return <Page>

      <h1>Index page</h1>

    </Page>;
  }
}

export default IndexPage;