import { useState } from 'react';
import { makeAutoObservable, toJS } from 'mobx';
import DerivAPIBasic from "https://cdn.skypack.dev/@deriv/deriv-api/dist/DerivAPIBasic";


const app_id = 1089;
const connection = new WebSocket(
    `wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`
);
const api = new DerivAPIBasic( { connection } );


class TickStream {
    tickStreamData = [];
    ticksRequestBody = {};
    ticksSubscriber = () => api.subscribe({
        ...this.ticksRequestBody,
        subscribe: 1
    });

    constructor() {
        makeAutoObservable(this);
    }

    settickStreamData(streamData) {
        this.tickStreamData = streamData;
    }

    setticksRequestBody(body) {
        this.ticksRequestBody = (body);
        this.ticksRequestBody = toJS(this.ticksRequestBody);
        console.log(toJS(this.ticksRequestBody))
    }

    subscribeTicks = async () => {
        connection.addEventListener("message", this.ticksResponse);
        await this.ticksSubscriber();
    };

    unsubscribeTicks = async () => {
        connection.removeEventListener("message", this.ticksResponse, false);
        await this.ticksSubscriber().unsubscribe();
    }

    ticksResponse = async (res) => {
        const data = JSON.parse(res.data);
    
        if(data.error !== undefined) {
            console.log("getTicksStream Error : ", data.error.message);
            connection.removeEventListener("message", this.ticksResponse, false);
            await api.disconnect();
        }
    
        if(data.msg_type === "tick") {
            console.log(data.tick);
            this.settickStreamData([...this.tickStreamData, data.tick]);
        }
    };

};

export default new TickStream();