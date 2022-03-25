import * as _ from "lodash";
import { connect } from "async-mqtt";
import { Packet } from "mqtt-packet";
import pako from "pako"; import { args } from "./args";
import Long from "long";
import { decodePayload } from "@jcoreio/sparkplug-payload/spBv1.0";

const { host, port, topic, gunzip, pretty, verbose } = args;


const space = pretty ? 2 : undefined;


const mqttClient = connect(host, { port });


const onConnect = async () => {
    console.debug("connected to", host, "on port", port);

    await mqttClient.subscribe(topic);
    console.debug("subscribed to topic", topic);


    mqttClient.on(
        "message",
        async (topic: string, payload: Buffer, msg: Packet) => {
            if (msg.cmd === "publish") {
                let decoded = decodePayload(payload);

                if (gunzip && (decoded.uuid !== undefined)) {
                    const body = pako.inflate(decoded.body as Uint8Array);
                    decoded = decodePayload(body);
                }

                console.log(verbose ? topic : "", JSON.stringify(
                    decoded,
                    (key, value) => {
                        if (Long.isLong(value)) {
                            return value.toString();
                        }
                        return value;
                    },
                    space
                ));
            }
        }
    );

};

const onDisconnect = async () => {
    console.debug("disconnected from", host, "on port", port);

    await mqttClient.unsubscribe(topic);
    console.debug("unsubscribed from topic", topic);
};

mqttClient.on("connect", onConnect);
mqttClient.on("disconnect", onDisconnect);
