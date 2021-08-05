import React, {useContext} from "react";
import {HandleInfo} from "./_types";


export type MultiSliderContextValue = {
  handles: HandleInfo[];
  initHandle: (id: number, percentage: number) => number;
  updateHandle: (id: number, percentage: number) => void;
  moveHandle: (id: number, movementX: number) => void;
  moveProgress: (startID: number, endID: number, movementX: number) => void;
  getHandleById: (id: number) => HandleInfo | undefined;
};


type OptionalMultiSliderContextValue = MultiSliderContextValue | undefined;


export const MultiSliderContext = React.createContext<any>(undefined);

export const useMultiSliderContext = (): OptionalMultiSliderContextValue => {
  return useContext<OptionalMultiSliderContextValue>(MultiSliderContext);
}
