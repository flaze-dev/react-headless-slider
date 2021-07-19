import React, {ReactNode} from "react";
import {useSliderContext} from "./_context";
import {Percentages} from "./_types";


type SliderChildProps = {
  children?: (percentages: Percentages) => ReactNode;
};


/**
 * SliderChild Component
 * @author Ingo Andelhofs
 */
const SliderChild = ({children}: SliderChildProps) => {
  const context = useSliderContext();

  if (!context) {
    console.warn("@SliderChild: You are using Slider.[Element] outside of Slider");
    return null;
  }

  if (!children) {
    return null;
  }

  const {percentageX, percentageY} = context;

  return children({
    percentageY,
    percentageX
  });
}

export default SliderChild;