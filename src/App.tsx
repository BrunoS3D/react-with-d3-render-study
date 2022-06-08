import { useState, useEffect, useRef, LegacyRef } from 'react';
import render from 'd3-render';

type ElementDatum = {
  append: string;
  children?: ElementDatum[];
  duration?: number | Function | TransitionObject;
  delay?: number | Function | TransitionObject;
  ease?: Function | TransitionObject;
  style?: ElementStyles;
  call?: Function;
} & { [key: string]: ElementValue };

type ElementValue = number | string | Function | object;

type ElementStyles = {
  [key: string]: number | string | Function | object;
};

type TransitionObject = {
  start?: number | string | Function;
  update?: number | string | Function;
  enter: number | string | Function;
  exit?: number | string | Function;
};

const App = () => {
  const svg = useRef<SVGSVGElement>();

  const [data, setData] = useState<ElementDatum[]>([
    {
      append: 'rect',
      width: 100,
      height: 100,
      fill: 'green',
      duration: 250,
      // Add some interactivity to the <rect> element
      onClick: () => {
        setData(([rect, ...rest]) => [{ ...rect, fill: rect.fill === 'green' ? 'yellow' : 'green' }, ...rest]);
      },
    },
  ]);

  useEffect(() => {
    if (svg && svg.current) {
      // Pass svg node to D3 render, along with data.
      // render runs whenever data changes
      render(svg.current, data);
    }
  }, [data]);

  return <svg ref={svg as LegacyRef<SVGSVGElement>}></svg>;
};

export default App;
