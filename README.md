# React Headless Slider (unstable)
A headless Slider compnent build with React.


## Installation
```bash
$ npm install @flaze/react-headless-slider
```
or 
```bash
$ yarn add @flaze/react-headless-slider
```


## Usage
### Slider
```tsx
<Slider className="w-full h-8 bg-green-500" percentageX={40}>
  <Slider.Progress children={({percentageX}: any) => {
    return <div
      className="h-full bg-blue-600"
      style={{width: `${percentageX}%`}}
    />
  }}/>
</Slider>
```

### MultiSlider
```tsx
 <MultiSlider
  className="relative mx-auto w-full h-8 bg-green-500"
  onHandlesChange={({getHandleById}: OnHandleChangeProps) => {
    const firstHandlePercentage = getHandleById(0).percentage;
    const secondHandlePercentage = getHandleById(1).percentage;

    console.log(firstHandlePercentage, secondHandlePercentage);
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
```