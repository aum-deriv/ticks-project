import { useEffect } from 'react';
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
  scale: {min: number, max: number} = {min: 0, max: 15};
  constructor() {
    makeAutoObservable(this);
  }
  setscale(s: {min: number, max: number}) {
    this.scale = s;
  }
  resetScale() {
    this.scale = {min: 0, max: 15}
  }
};

const Graph = observer(() => {

  let throttle = true;

  function debounce(event) {
    if(throttle) {
      throttle = false;
      // console.log("Throttle", throttle);
      handleScroll(event);
      setTimeout(() => {
        throttle = true;
        // console.log("Throttle", throttle);
      }, 500);
    }
  }


  useEffect(() => {

    if(graphScale.scale.max === TicksStream.tickStreamData.length - 1)
      handleScroll({deltaY: 1});
    
  }, [TicksStream.tickStreamData]);

  const handleScroll = (event: any) => {

    let minmax;

    if(event.deltaY >= 0 && graphScale.scale.max <= TicksStream.tickStreamData.length) {

      // increament min and max
      minmax = {
        min: graphScale.scale.min + 1,
        max: graphScale.scale.max + 1
      }
    }
    else if (event.deltaY < 0 && graphScale.scale.min > 0) {
      // decreament min and max
      minmax = {
        min: graphScale.scale.min - 1,
        max: graphScale.scale.max - 1
      }

    }

    if(minmax)
      graphScale.setscale(minmax);
  };

    return (
        <div 
          className='graph-wrapper'
        >
            <Line className='graph'
                onWheel={
                  debounce
                }
                data={{
                    labels: [...TicksStream.tickStreamData.map((el, id) => new Date(el.epoch * 1000).toLocaleTimeString("it-IT")), 'now'],
                    datasets: [
                    {
                        label: 'Ask Price ',
                        data: [...TicksStream.tickStreamData.map(el => el.ask), null],
                        borderColor: '#008079'
                    },
                    ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'bottom' as const
                    },
                  },
                  scales: {
                    x: {
                        display: true,
                        title: "epochs",
                        min: graphScale.scale.min,
                        max: graphScale.scale.max,
                        grid: {
                          color: "#1e1e1e"
                        }
                    }, 
                    y: {
                      grid: {
                        color: "#1e1e1e"
                      }
                    },
                  },

              }}
            />
                    
                    
            <div className='scroll-btn-container'>
              <button 
                onClick={() => handleScroll({deltaY: -1})}
                className='scroll-btn'
              >
                  ◀ Move Left
              </button>
              <button 
                onClick={() => handleScroll({deltaY: 1})}
                className='scroll-btn'
                >
                 Move Right ▶
              </button>
            </div>
        </div>

    );
}
);
let graphScale = new GraphScale();
export {Graph, graphScale};