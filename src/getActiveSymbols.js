import DerivAPIBasic from "https://cdn.skypack.dev/@deriv/deriv-api/dist/DerivAPIBasic";

const app_id = 1089;
const connection = new WebSocket(
    `wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`
);
const api = new DerivAPIBasic( { connection } );

const activeSymbolsRequest = {
    "active_symbols": "brief",
    "product_type": "basic"
};


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
        console.log(data.active_symbols);
        connection.removeEventListener("message", activeSymbolsResponse, false);
        return data.active_symbols;
    }

    connection.removeEventListener("message", activeSymbolsResponse, false);
};

const getActiveSymbols = async () => {
    // add listener for data from websocket.
    connection.addEventListener("message", activeSymbolsResponse);
    await api.activeSymbols(activeSymbolsRequest); // method to retrieve active symbols data which takes the request body as a parameter.
};

export default getActiveSymbols;