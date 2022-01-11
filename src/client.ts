import * as _ from "lodash";
import { connect } from "async-mqtt";
import { Packet } from "mqtt-packet";
import pako from "pako";

const decodePayload = require('sparkplug-payload').get("spBv1.0").decodePayload;





const publicMQTTServer = {
    url: "mqtt://test.mosquitto.org",
    port: 1883,
    // topic: "spBv1.0/Edge Nodes/#"
    // topic: "spBv1.0/Sparkplug B Devices/+/JSON-SCADA Server/#",
    topic: "spBv1.0/#",
    decode: false,
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

const { url, port, topic, decode = true, pretty = false } = publicMQTTServer;

const space = pretty ? 2 : undefined;


const mqttClient = connect(url, { port });


const onConnected = async () => {
    console.debug("connected to", url, port);

    await mqttClient.subscribe(topic);


    mqttClient.on(
        "message",
        async (topic: string, payload: Buffer, msg: Packet) => {
            if (msg.cmd === "publish") {
                let decoded = decodePayload(payload);

                if (decode && (decoded.uuid !== undefined)) {
                    const body = pako.inflate(decoded.body);
                    decoded = decodePayload(body);
                }

                console.log(topic, JSON.stringify(decoded, null, space));
            }
        }
    );

};

mqttClient.on("connect", onConnected);
