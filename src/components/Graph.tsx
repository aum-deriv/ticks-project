import { useState, useEffect } from 'react';
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


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
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
          min: 0,
          max: 2,
      }, 
      y: {},
    },

  };



const Graph = observer(() => {

  const handleScroll = (event) => {
    console.log(event.deltaY)

    if(event.deltaY > 0) {
      // increament min and max
    }
    else if (event.deltaY < 0) {
      // decreament min and max
    }
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
                onWheel={handleScroll}
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
                options={options}
            />
        </div>
    );
}
);
export default Graph;