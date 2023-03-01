import React from 'react';
import { useState } from 'react';
import { observer } from 'mobx-react';


import getActiveSymbols from '../getActiveSymbols.js';
import TicksStream from '../TicksStream.js';

getActiveSymbols();
TicksStream.setticksRequestBody({ "ticks": "R_50" });
TicksStream.subscribeTicks();
setTimeout(TicksStream.unsubscribeTicks, 10000);

const Graph = observer(() => {


    return (
        <div className='graph-wrapper'>
            graph-wrapper
            {JSON.stringify(TicksStream.tickStreamData)}
        </div>
    );
}
);
export default Graph;