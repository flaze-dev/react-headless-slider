import React, {useContext} from "react";
import {HandleInfo} from "./_types";


type MultiSliderContextValue = {
  handles: HandleInfo[];
  initHandle: (percentage: number) => number;
};


type OptionalMultiSliderContextValue = MultiSliderContextValue | undefined;


export const MultiSliderContext = React.createContext<any>(undefined);

export const useMultiSliderContext = (): OptionalMultiSliderContextValue => {
  return useContext<OptionalMultiSliderContextValue>(MultiSliderContext);
}
