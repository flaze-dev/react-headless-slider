/* eslint-disable react/no-children-prop */
import React, {Component, HTMLAttributes, ReactNode} from "react";
import MultiSliderHandle from "./MultiSliderHandle";
import MultiSliderProgress from "./MultiSliderProgress";
import {MultiSliderContext} from "./_context";
import {HandleInfo} from "./_types";
import RefManager from "../../utils/RefManager";
import ValueUtil from "../../utils/ValueUtil";


interface Props extends HTMLAttributes<HTMLDivElement> {
  children: (data: any) => ReactNode;
}

interface State {
  handles: HandleInfo[];
}


/**
 * MultiSlider Component
 * @author Ingo Andelhofs
 */
class MultiSlider extends Component<Props, State> {

  // Static
  public static Handle = MultiSliderHandle;
  public static Progress = MultiSliderProgress;

  // Ref
  private refManager = new RefManager<HTMLDivElement>();

  // State
  public state: State = {
    handles: [],
  }

  private initHandle = (id: number, percentage: number): number => {
    const handle: HandleInfo = {
      id: id,
      percentage: ValueUtil.ensureBetween(percentage, {min: 0, max: 100}),
    };

    this.setState((s: State) => ({
      handles: [...s.handles, handle],
    }));

    return handle.id;
  }

  private moveHandle = (id: number, movementX: number): void => {
    const {clientWidth} = this.refManager.get();
    const movementPercentage = movementX / clientWidth;

    this.setState((s: State) => {
      const updatedHandles = s.handles.map((handle: HandleInfo) => {
        if (handle.id === id) {
          const percentage = handle.percentage + movementPercentage;
          return {
            id,
            percentage: ValueUtil.ensureBetween(percentage, {min: 0, max: 100})
          };
        }

        return handle;
      });

      return {handles: updatedHandles};
    });
  }

  private moveProgress = (startID: number, endID: number, movementX: number): void => {
    const {clientWidth} = this.refManager.get();
    const movementPercentage = movementX / clientWidth;

    this.setState((s: State) => {
      const startHandle = s.handles.find((handle: HandleInfo) => handle.id === startID);
      const endHandle = s.handles.find((handle: HandleInfo) => handle.id === endID);

      if (startHandle === undefined || endHandle === undefined) {
        return null;
      }

      const sx = startHandle.percentage + movementPercentage;
      if (sx < 0 || sx > 100) {
        return null;
      }

      const ex = endHandle.percentage + movementPercentage;
      if (ex < 0 || ex > 100) {
        return null;
      }

      const updatedHandles = s.handles.map((handle: HandleInfo) => {
        if (handle.id === startID || handle.id === endID) {
          const percentage = handle.percentage + movementPercentage;
          return {
            id: handle.id,
            percentage: percentage
          };
        }

        return handle;
      });

      return {handles: updatedHandles};
    });
  }


  // Rendering
  private renderChildren(): ReactNode {

    return <MultiSliderContext.Provider
      children={this.props.children({
        handles: this.state.handles
      })}
      value={{
        handles: this.state.handles,
        initHandle: this.initHandle,
        moveHandle: this.moveHandle,
        moveProgress: this.moveProgress,
      }}
    />;
  }

  public render(): ReactNode {
    const {children, ...rest} = this.props;

    return <div
      ref={this.refManager.createRef}
      data-element="multi-slider"
      children={this.renderChildren()}
      {...rest}
    />;
  }
}

export default MultiSlider;