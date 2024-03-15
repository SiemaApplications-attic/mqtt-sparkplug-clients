import _ from "lodash";
import {connect, IClientOptions} from "async-mqtt";
import {Packet} from "mqtt-packet";
import pako from "pako";
import {args} from "./args";
import fs from "fs";

import * as sparkplug from 'sparkplug-payload';
const sparkplugbpayload = sparkplug.get("spBv1.0");
const decodePayload = sparkplugbpayload!.decodePayload;

import {filter} from "./helpers/filter";
import {customJSONStringify} from "./helpers/format";

const {host, port, topic, gunzip, pretty, json, verbose, cafile, key, cert, insecure, id, showTimestamp} = args;


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

            decoded.metrics = filter(decoded.metrics);

            if (verbose) {
                console.log();
                console.log(`${showTimestamp ? new Date().toISOString() + " " : ""}${topic}`);
            }

            if (json) {
                console.log(JSON.stringify(decoded, customJSONStringify, pretty ? 2 : undefined));
            } else {
                console.dir(decoded, {breakLength: Infinity, maxStringLength: Infinity, maxArrayLength: Infinity, compact: !pretty, depth: Infinity});
            }
        } catch (e: any) {
            console.error(e.message);
            console.error(Buffer.from(payload));
        }
    }
};

const onDisconnect = async () => {
    console.debug("disconnected from", host, "on port", port);
};

const onError = (error: Error) => {
    console.error(error);
    // process.exit(-2);
};

mqttClient.on("connect", onConnect);
mqttClient.on("disconnect", onDisconnect);
mqttClient.on("message", onMessage);
mqttClient.on("error", onError);
