import { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';

import { Line } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

import TicksStream from '../TicksStream.js';
import ActiveSymbolsDropDown from './ActiveSymbolsDropDown.js';
import { Ticks } from 'chart.js/dist/index.js';
import { makeAutoObservable } from 'mobx';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
  

class GraphScale {
  scale: {min: number, max: number} = {min: 0, max: 10};
  constructor() {
    makeAutoObservable(this);
  }
  setscale(s: {min: number, max: number}) {
    this.scale = s;
  }
  resetScale() {
    this.scale = {min: 0, max: 10}
  }
};

const Graph = observer(() => {

  // const [scale, setscale] = useState({min: 0, max: 5});
  let throttle = true;
  let isAtEnd = true;

  function debounce(event) {
    if(throttle) {
      throttle = false;
      console.log("Throttle", throttle);
      handleScroll(event);
      setTimeout(() => {
        throttle = true;
        console.log("Throttle", throttle);
      }, 500);
    }
  }


  useEffect(() => {
    console.log("scale", graphScale.scale);
    console.log("isAtEnd", isAtEnd)
    // if(isAtEnd)
    if(graphScale.scale.max === TicksStream.tickStreamData.length - 1)
      handleScroll({deltaY: 1})
    // chartRef.update();
  }, [TicksStream.tickStreamData]);

  const handleScroll = (event: any) => {
    // console.log(event.deltaY)
    // const optionsCopy = {};
    let minmax;
    let delta = 0.005
    if(event.deltaY >= 0 && graphScale.scale.max <= TicksStream.tickStreamData.length) {
      // increament min and max
      console.log("mORE than 0");
      minmax = {
        min: graphScale.scale.min + 1,
        max: graphScale.scale.max + 1
      }
    //   optionsCopy.scales.x.min = Math.ceil(optionsCopy.scales.x.min + delta);
    //   optionsCopy.scales.x.max = Math.ceil(optionsCopy.scales.x.max + delta);
    }
    else if (event.deltaY < 0 && graphScale.scale.min > 0) {
      // decreament min and max
      minmax = {
        min: graphScale.scale.min - 1,
        max: graphScale.scale.max - 1
      }

      isAtEnd = false;
    }


    // setgraphOptions();
    if(minmax)
      graphScale.setscale(minmax);
  };

  // useEffect(() => {
  //   window.addEventListener("wheel", handleScroll, true);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

    return (
        <div 
          className='graph-wrapper'
        >
            {/* {JSON.stringify(TicksStream.tickStreamData)} */}
            <Line
                onWheel={
                  debounce
                }
                data={{
                    labels: TicksStream.tickStreamData.map((el, id) => id),
                    datasets: [
                    {
                        label: 'Ask Price ',
                        data: TicksStream.tickStreamData.map(el => el.ask),
                        borderColor: '#00000'
                    },
                    ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top' as const
                    },
                    title: {
                      display: true,
                      text: 'Chart.js Line Chart',
                    },
                  },
                  scales: {
                    x: {
                        display: true,
                        title: "epochs",
                        min: graphScale.scale.min,
                        max: graphScale.scale.max,
                    }, 
                    y: {},
                  },
              }}
                // redraw={true}
            />
                    
                    
          <button 
          onClick={() => handleScroll({deltaY: -1})}
          className='left'>
            left
          </button>
          <button 
            onClick={() => handleScroll({deltaY: 1})}
            className='right'>
            right
          </button>
        </div>

    );
}
);
let graphScale = new GraphScale();
export {Graph, graphScale};