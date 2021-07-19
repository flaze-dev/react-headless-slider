import React, {useContext} from "react";


type SliderContextValue = {
  percentageX: number;
  percentageY: number;
  setPercentageX: (percentageX: number) => void;
  setPercentageY: (percentageY: number) => void;
};

type OptionalSliderContextValue = SliderContextValue | undefined;


export const SliderContext = React.createContext<OptionalSliderContextValue>(undefined);

export const useSliderContext = (): OptionalSliderContextValue => {
  return useContext<OptionalSliderContextValue>(SliderContext);
}
