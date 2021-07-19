/* eslint-disable react/no-children-prop */
import React, {Component, ReactNode} from "react";
import {Slider, MultiSlider} from "../lib";
import Page from "../core/Page";


/**
 * IndexPage Component
 * @author Ingo Andelhofs
 */
class IndexPage extends Component<never, never> {

  // Rendering
  public render(): ReactNode {
    return <Page className="w-full h-full p-4 flex flex-col gap-4">

      <h1 className="text-2xl font-bold">Slider demo&apos;s</h1>

      <Slider className="w-full h-8 bg-green-500" percentageX={40}>
        <Slider.Progress children={({percentageX}: any) => {
          return <div
            className="h-full bg-blue-600"
            style={{width: `${percentageX}%`}}
          />
        }}/>
      </Slider>

      <MultiSlider
        className="relative mx-auto w-full h-8 bg-green-500"
        onHandlesChange={({getHandleById}: any) => {

          const handle = getHandleById(0)!;
          console.log(handle.percentage);

        }}
        children={({handles, initialized}) => {

          return <>
            <MultiSlider.Progress
              progressID={0}
              startID={0}
              endID={1}

              className="absolute h-full bg-gray-500"
              style={{
                left: initialized ? `${handles[0].percentage}%` : 0,
                width: initialized ? `calc(${handles[1].percentage - handles[0].percentage}%)` : 0,
              }}
            />

            <MultiSlider.Handle
              handleID={0}
              percentage={20}
              className="absolute h-full w-8 bg-blue-600"
              style={{left: initialized ? `${handles[0].percentage}%` : 0}}
            />

            <MultiSlider.Handle
              handleID={1}
              percentage={60}
              className="absolute h-full w-8 bg-blue-600"
              style={{left: initialized ? `calc(${handles[1].percentage}% - 2rem)` : 0}}
            />
          </>;
        }}
      />

    </Page>;
  }
}

export default IndexPage;