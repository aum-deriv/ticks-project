import { makeAutoObservable } from "mobx";
import DerivAPIBasic from "https://cdn.skypack.dev/@deriv/deriv-api/dist/DerivAPIBasic";


const app_id = 1089;
const connection = new WebSocket(
    `wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`
);
const api = new DerivAPIBasic( { connection } );

class TicksStreamData {
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
        this.ticksRequestBody = body;
        console.log(this.ticksRequestBody)
    }
};

export default new TicksStreamData();