import React from 'react';
import { useState } from 'react';

import getActiveSymbols from '../getActiveSymbols.js';
import { getTicksStream, subscribeTicks, unsubscribeTicks } from '../getTicksStream.js';

const Graph = () => {
    getActiveSymbols();
    subscribeTicks();

    setTimeout(unsubscribeTicks, 3000);
    return (
        <div className='graph-wrapper'>
            graph-wrapper
        </div>
    );
};

export default Graph;