import { useState, useEffect } from 'react';
import { observer } from 'mobx-react';


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
                graph-wrapper
                {JSON.stringify(TicksStream.tickStreamData)}
                <ActiveSymbolsDropDown></ActiveSymbolsDropDown>
            </div>
        );
}
);
export default Graph;