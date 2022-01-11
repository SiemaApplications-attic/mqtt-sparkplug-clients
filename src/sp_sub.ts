import * as _ from "lodash";
import { connect } from "async-mqtt";
import { Packet } from "mqtt-packet";
import pako from "pako";
import { args } from "./args";

const decodePayload = require('sparkplug-payload').get("spBv1.0").decodePayload;





const publicMQTTServer = {
    host: "mqtt://test.mosquitto.org",
    port: 1883,
    // topic: "spBv1.0/Edge Nodes/#"
    // topic: "spBv1.0/Sparkplug B Devices/+/JSON-SCADA Server/#",
    topic: "spBv1.0/#",
    gunzip: false,
    pretty: false,
};
// const publicMQTTServer = {
//     url: "mqtt://broker.hivemq.com",
//     port: 1883,
//     topic: "spBv1.0/ICSEdge/#",
//     // topic: "spBv1.0/Sparkplug B Devices/#"
//     decode: true,
//     pretty: false,
// };

const { host, port, topic, gunzip, pretty, verbose } = args;


const space = pretty ? 2 : undefined;


const mqttClient = connect(host, { port });


const onConnected = async () => {
    console.debug("connected to", host, "on port", port);

    await mqttClient.subscribe(topic);
    console.debug("subscribed to", topic);


    mqttClient.on(
        "message",
        async (topic: string, payload: Buffer, msg: Packet) => {
            if (msg.cmd === "publish") {
                let decoded = decodePayload(payload);

                if (gunzip && (decoded.uuid !== undefined)) {
                    const body = pako.inflate(decoded.body);
                    decoded = decodePayload(body);
                }

                console.log(verbose ? topic : "", JSON.stringify(decoded, null, space));
            }
        }
    );

};

mqttClient.on("connect", onConnected);
