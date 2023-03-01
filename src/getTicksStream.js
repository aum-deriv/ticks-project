import DerivAPIBasic from "https://cdn.skypack.dev/@deriv/deriv-api/dist/DerivAPIBasic";

const app_id = 1089;
const connection = new WebSocket(
    `wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`
);
const api = new DerivAPIBasic( { connection } );

const ticksStreamRequest = {
    "ticks": "R_50",
    "subscribe": 1
};

const ticksRequest = {
    ...ticksStreamRequest,
    subscribe: 1
};

const ticksSubscriber = () => api.subscribe(ticksRequest); 


const ticksResponse = async (res) => {
    const data = JSON.parse(res.data);

    if(data.error !== undefined) {
        console.log("getTicksStream Error : ", data.error.message);
        connection.removeEventListener("message", ticksResponse, false);
        await api.disconnect();
    }

    if(data.msg_type === "tick") {
        console.log(data.tick);
    }
};

const subscribeTicks = async () => {
    connection.addEventListener("message", ticksResponse);
    await ticksSubscriber();
};

const unsubscribeTicks = async () => {
    connection.addEventListener("message", ticksResponse, false);
    await ticksSubscriber().unsubscribe();
}

const getTicksStream = () => {

};

export { getTicksStream, subscribeTicks, unsubscribeTicks };