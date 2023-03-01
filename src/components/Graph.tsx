import { useState, useEffect } from 'react';
import { observer } from 'mobx-react';

import { LineChart, Line, XAxis, YAxis } from 'recharts';


import TicksStream from '../TicksStream.js';
import ActiveSymbolsDropDown from './ActiveSymbolsDropDown.js';

// activeSymbolsResponse();
// TicksStream.setticksRequestBody({ "ticks": "R_50" });
// TicksStream.subscribeTicks();
// setTimeout(TicksStream.unsubscribeTicks, 10000);

const Graph = observer(() => {

    // if(!dataLoaded) 
    //     return (<div>Loading Derived Indices...</div>)
    // else
        return (
            <div className='graph-wrapper'>
                {/* {JSON.stringify(TicksStream.tickStreamData)} */}

                <LineChart width={800} height={800} data={TicksStream.tickStreamData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                >
                    <YAxis dataKey="ask" />
                    <XAxis dataKey="epoch" />
                    <Line dataKey="ask" type="monotone" stroke="#000000"></Line>
                </LineChart>
            </div>
        );
}
);
export default Graph;