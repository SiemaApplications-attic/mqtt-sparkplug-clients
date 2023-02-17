import * as _ from "lodash";
import { connect, IClientOptions } from "async-mqtt";
import { Packet } from "mqtt-packet";
import pako from "pako"; import { args } from "./args";
import { decodePayload } from "@jcoreio/sparkplug-payload/spBv1.0";
import fs from "fs";

const { host, port, topic, gunzip, pretty, json, verbose, cafile, key, cert, insecure, id } = args;


const mqttClientOptions: IClientOptions = {
    host,
    port,
    rejectUnauthorized: !insecure,
    clientId: id,
};

if (cafile !== undefined) {
    mqttClientOptions.ca = fs.readFileSync(cafile);
}

if (key !== undefined) {
    mqttClientOptions.key = fs.readFileSync(key);
}

if (cert !== undefined) {
    mqttClientOptions.cert = fs.readFileSync(cert);
}

const mqttClient = connect(host, mqttClientOptions);

const onConnect = async () => {
    console.debug("connected to", host, "on port", port);

    await mqttClient.subscribe(topic);
    console.debug("subscribed to topic", topic);
};

const onMessage = async (topic: string, payload: Buffer, msg: Packet) => {
    if (msg.cmd === "publish") {
        try {
            let decoded = decodePayload(payload);

            if (gunzip && (decoded.uuid !== undefined)) {
                const body = pako.inflate(decoded.body as Uint8Array);
                decoded = decodePayload(body);
            }

            if (verbose) {
                console.log();
                console.log(topic);
            }
            if (json) {
                console.log(JSON.stringify(decoded, (key, value) => typeof value === "bigint" ? value.toString() : value, pretty ? 2 : undefined));
            } else {
                console.dir(decoded, { breakLength: Infinity, maxStringLength: Infinity, maxArrayLength: Infinity, compact: !pretty, depth: Infinity });
            }
        } catch (e) {
            console.error(e);
        }
    }
};

const onDisconnect = async () => {
    console.debug("disconnected from", host, "on port", port);

    await mqttClient.unsubscribe(topic);
    console.debug("unsubscribed from topic", topic);
};

const onError = (error: Error) => {
    console.error(error);
    // process.exit(-2);
};

mqttClient.on("connect", onConnect);
mqttClient.on("disconnect", onDisconnect);
mqttClient.on( "message", onMessage);
mqttClient.on("error", onError);
