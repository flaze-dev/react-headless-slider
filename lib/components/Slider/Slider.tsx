/* eslint-disable react/no-children-prop */
import React, {Component, HTMLAttributes, ReactNode} from "react";
import SliderChild from "./SliderChild";
import PointerEventManager, {ExtendedPointerEvent} from "../../utils/PointerEventManager";
import {SliderContext} from "./_context";
import {Percentages} from "./_types";
import RefManager from "../../utils/RefManager";


interface Props extends HTMLAttributes<HTMLElement> {
  percentageX?: number;
  percentageY?: number;
  onPercentageChange?: (percentages: Percentages) => void;
  onPercentageXChange?: (percentage: number) => void;
  onPercentageYChange?: (percentage: number) => void;
}

interface State {
  percentageX: number;
  percentageY: number;
}


/**
 * Slider Component
 * @author Ingo Andelhofs
 */
class Slider extends Component<Props, State> {

  public static readonly Handle: any = SliderChild;
  public static readonly Progress: any = SliderChild;

  private refManager = new RefManager<HTMLDivElement>();
  private manager?: PointerEventManager<HTMLDivElement>;

  // State
  public state: State = {
    percentageX: 0,
    percentageY: 0,
  };

  private setPercentageX = (percentageX: number) => {
    this.setState(() => ({percentageX}));
  }

  private setPercentageY = (percentageY: number) => {
    this.setState(() => ({percentageY}));
  }

  private updatePercentages = (percentages: Percentages) => {
    const {percentageX, percentageY} = percentages;

    const xChanged = this.state.percentageX !== percentageX;
    const yChanged = this.state.percentageY !== percentageY;

    if (xChanged || yChanged) {
      this.props.onPercentageChange?.(percentages);
    }

    if (xChanged) {
      this.setPercentageX(percentageX);
      this.props.onPercentageXChange?.(percentageX);
    }

    if (yChanged) {
      this.setPercentageY(percentageY);
      this.props.onPercentageYChange?.(percentageY);
    }
  }



  // Listeners
  private onPointerDown = (event: ExtendedPointerEvent) => {
    event.domEvent.preventDefault();

    const {x, y} = event.percentages(this.refManager.get());
    const percentages: Percentages = {
      percentageX: x * 100,
      percentageY: y * 100,
    };

    this.updatePercentages(percentages);
  }

  private onPointerMove = (event: ExtendedPointerEvent) => {
    event.domEvent.preventDefault();

    if (!event.pointerDown)
      return;

    const {x, y} = event.percentages(this.refManager.get());
    const percentages: Percentages = {
      percentageX: x * 100,
      percentageY: y * 100,
    };

    this.updatePercentages(percentages);
  }

  private onPointerUp = (event: ExtendedPointerEvent) => {
    event.domEvent.preventDefault();
  }


  // Lifecycle
  private initState(): void {
    this.setPercentageX(this.props.percentageX ?? 0);
    this.setPercentageY(this.props.percentageY ?? 0);
  }

  private setupListeners(): void {
    const sliderElement = this.refManager.get();
    this.manager = new PointerEventManager(sliderElement);
    this.manager.on("pointerdown", this.onPointerDown);
    this.manager.on("pointermove", this.onPointerMove);
    this.manager.on("pointerup", this.onPointerUp);
  }

  private clearListeners(): void {
    this.manager!.off("pointerdown", this.onPointerDown);
    this.manager!.off("pointermove", this.onPointerMove);
    this.manager!.off("pointerup", this.onPointerUp);
  }

  public componentDidMount() {
    this.initState();
    this.setupListeners();
  }

  public componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
    // Check updated
    const updated = {
      props: {
        percentageX: this.props.percentageX !== prevProps.percentageX,
        percentageY: this.props.percentageY !== prevProps.percentageY,
      }
    };

    // Update state
    if (updated.props.percentageX && this.props.percentageX !== this.state.percentageX) {
      this.setPercentageX(this.props.percentageX ?? 0);
    }

    if (updated.props.percentageY && this.props.percentageY !== this.state.percentageY) {
      this.setPercentageY(this.props.percentageY ?? 0);
    }
  }

  public componentWillUnmount() {
    this.clearListeners();
  }


  // Rendering
  private renderChildren(): ReactNode {

    return <SliderContext.Provider
      children={this.props.children}
      value={{
        percentageX: this.state.percentageX,
        percentageY: this.state.percentageY,
        setPercentageX: this.setPercentageX,
        setPercentageY: this.setPercentageY,
      }}
    />
  }

  public render(): ReactNode {
    const {
      percentageX, percentageY, onPercentageChange, onPercentageXChange, onPercentageYChange,
      children, ...rest
    } = this.props;

    return <div
      ref={this.refManager.createRef}
      data-element="slider"
      children={this.renderChildren()}
      {...rest}
    />;
  }
}


export default Slider;