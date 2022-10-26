import { connect, IClientOptions } from "async-mqtt";
import { args } from "./args";
import { encodePayload, InputPayload } from "@jcoreio/sparkplug-payload/spBv1.0";
import fs from "fs";

const { host, port, topic, message, cafile, key, cert, insecure, id } = args;


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

    try {
        const parsed = JSON.parse(message);

        const metrics = Array.isArray(parsed) ? parsed : [parsed];

        const inputPayload = {
            timestamp: new Date().getTime(),
            metrics,
            seq: 1
        } as InputPayload

        const encoded = encodePayload(inputPayload);

        await mqttClient.publish(topic, Buffer.from(encoded));

        console.debug("succesfully published payload", inputPayload, "to topic", topic);
        process.exit(0);

    } catch (e: any) {
        console.error(e.message);
        process.exit(-1);
    }

};

const onDisconnect = async () => {
    console.debug("disconnected from", host, "on port", port);

    await mqttClient.unsubscribe(topic);
    console.debug("unsubscribed from topic", topic);
};


const onError = (error: Error) => {
    console.error(error);
    process.exit(-2);
};

mqttClient.on("connect", onConnect);
mqttClient.on("disconnect", onDisconnect);
mqttClient.on("error", onError);
