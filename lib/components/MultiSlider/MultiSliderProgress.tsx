import React, {Component, HTMLAttributes, ReactNode} from "react";
import {MultiSliderContext} from "./_context";
import RefManager from "../../utils/RefManager";
import PointerEventManager, {ExtendedPointerEvent} from "../../utils/PointerEventManager";


interface Props extends HTMLAttributes<HTMLDivElement> {
  progressID: number;
  startID: number;
  endID: number;
}

interface State {}


/**
 * MultiSliderProgress Component
 * @author Ingo Andelhofs
 */
class MultiSliderProgress extends Component<Props, State> {
  // Static
  public static contextType = MultiSliderContext;

  // Ref
  private refManager = new RefManager<HTMLDivElement>();
  private manager?: PointerEventManager<HTMLDivElement>;


  // Listeners
  private onPointerDown = (event: ExtendedPointerEvent) => {
    event.domEvent.preventDefault();

    const {x} = event.movement;
    this.context.moveProgress(this.props.startID, this.props.endID, x * 100);
  }

  private onPointerMove = (event: ExtendedPointerEvent) => {
    event.domEvent.preventDefault();

    if (!event.pointerDown)
      return;

    const {x} = event.movement;
    this.context.moveProgress(this.props.startID, this.props.endID, x * 100);
  }

  private onPointerUp = (event: ExtendedPointerEvent) => {
    event.domEvent.preventDefault();
  }


  // Lifecycle
  private initListeners() {
    const handleElement = this.refManager.get();
    this.manager = new PointerEventManager<HTMLDivElement>(handleElement);
    this.manager.on("pointerdown", this.onPointerDown);
    this.manager.on("pointermove", this.onPointerMove);
    this.manager.on("pointerup", this.onPointerUp);
  }

  private clearListeners() {
    this.manager!.off("pointerdown", this.onPointerDown);
    this.manager!.off("pointermove", this.onPointerMove);
    this.manager!.off("pointerup", this.onPointerUp);
  }

  public componentDidMount() {
    this.initListeners();
    // this.context.initHandle(this.props.handleID, this.props.percentage);
  }

  public componentWillUnmount() {
    this.clearListeners();
  }


  // Rendering
  public render(): ReactNode {
    const {progressID, startID, endID, ...rest} = this.props;

    return <div
      ref={this.refManager.createRef}
      data-element="multi-slider-progress"
      {...rest}
    />;
  }
}

export default MultiSliderProgress;