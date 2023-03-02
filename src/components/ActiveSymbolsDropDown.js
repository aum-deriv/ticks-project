import { useState, useEffect } from 'react';
import { makeAutoObservable } from 'mobx';
import DerivAPIBasic from "https://cdn.skypack.dev/@deriv/deriv-api/dist/DerivAPIBasic";
import TicksStream from '../TicksStream';

import { graphScale } from './Graph';

const app_id = 1089;
const connection = new WebSocket(
    `wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`
);
const api = new DerivAPIBasic( { connection } );

const activeSymbolsRequestBody = {
    "active_symbols": "brief",
    "product_type": "basic"
};

const ActiveSymbolsDropDown = () => {

    const [selectedSymbol, setselectedSymbol] = useState('');
    const [activeSymbolsData, setactiveSymbolsData] = useState([]);
    const [dataLoaded, setdataLoaded] = useState(false);

    let subInterval;
    useEffect(() => {
        graphScale.resetScale();
        if(selectedSymbol) {
            TicksStream.setticksRequestBody({ "ticks": selectedSymbol });
            console.log(typeof selectedSymbol)
            // // subInterval = setInterval(() => {
            TicksStream.subscribeTicks(); 
            // // }, 1000);
            // setInterval(() => {
            //     TicksStream.unsubscribeTicks();
            // }, 10000);
        }
    }, [selectedSymbol])

    const activeSymbolsResponse = async (res) => {
        const data = JSON.parse(res.data);
        
        // Error Handling
        if(data.error !== undefined) {
            console.log("Error : ", data.error?.message);
    
            // remove listener for data from websocket.
            connection.removeEventListener("message", activeSymbolsResponse, false);
            await api.disconnect();
        }
    
        // Data received successfully.
        if(data.msg_type === "active_symbols") {
            // console.log(data.active_symbols);
            // setdataLoader(true);
            setactiveSymbolsData(data.active_symbols);
            setselectedSymbol(data.active_symbols[0].symbol)
        }
        console.log("removing listener")
        connection.removeEventListener("message", activeSymbolsResponse, false);
    };
    
    const getActiveSymbols = async () => {
        // add listener for data from websocket.
        connection.addEventListener("message", activeSymbolsResponse);
        await api.activeSymbols(activeSymbolsRequestBody); // method to retrieve active symbols data which takes the request body as a parameter.
    };


    useEffect( () => {
        getActiveSymbols();
    }, [])


    useEffect(() => {
        console.log(selectedSymbol)
    }, [selectedSymbol]);

    return (
        <div className="active-symbols-wrapper">
            <select
                className="active-symbols-dropdown"
                onChange={(e) => {
                    setselectedSymbol(e.target.value);
                    TicksStream.settickStreamData([]);
                }}
                value={selectedSymbol}
            >
                {
                    activeSymbolsData.map((el, i) => {
                        return (
                            <option
                                key={i}
                                value={el.symbol}
                            >
                                {el.display_name}
                            </option>
                        );
                    })
                }

            </select>
        </div>
    );
};

export default ActiveSymbolsDropDown;