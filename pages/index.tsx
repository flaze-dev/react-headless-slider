/* eslint-disable react/no-children-prop */
import React, {Component, ReactNode} from "react";
import {Slider, MultiSlider} from "../lib";
import Page from "../core/Page";
import { OnHandleChangeProps } from "../dist/components/MultiSlider/_types";


/**
 * IndexPage Component
 * @author Ingo Andelhofs
 */
class IndexPage extends Component<never, any> {

  public state = {
    start: 20,
  };


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

      <button 
        className="p-1 bg-blue-600 text-white font-semibold rounded w-max"
        children="Update slider"
        onClick={() => {
          this.setState(() => ({
            start: 10,
          }));
        }}
      />

      <MultiSlider
        className="relative mx-auto w-full h-8 bg-green-500"
        onHandlesChange={({getHandleById}: OnHandleChangeProps) => {
          this.setState(() => ({
            start: getHandleById(0)?.percentage,
          }));
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
              percentage={this.state.start}
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