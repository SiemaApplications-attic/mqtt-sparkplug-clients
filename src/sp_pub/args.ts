import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";



export const args = yargs(hideBin(process.argv))
    .usage("Usage: $0 [options]")
    .option("host", {
        alias: "h",
        type: "string",
        description: "mqtt host to connect to",
        default: "mqtt://localhost"
    })
    .option("port", {
        alias: "p",
        type: "number",
        description: "network port to connect to",
        default: 1883
    })
    .option("topic", {
        alias: "t",
        type: "string",
        description: "mqtt topic to publish to",
        demandOption: true
    })
    .option("message", {
        alias: "m",
        type: "string",
        description: "Sparkplug MQTT metric(s): a stringified JSON that is either a single metric or an array of metrics",
        demandOption: true
    })
    .option("cafile", {
        type: "string",
        description: "Define the path to a file containing PEM encoded CA certificates that are trusted. Used to enable SSL communication."
    })
    .option("key", {
        type: "string",
        description: "Define the path to a file containing a PEM encoded private key for this client, if required by the server."
    })
    .option("cert", {
        type: "string",
        description: "Define the path to a file containing a PEM encoded certificate for this client, if required by the server."
    })
    .option("insecure", {
        type: "boolean",
        description: "do not check that the server certificate hostname matches the remote",
        default: false,
    })
    .option("id", {
        alias: "i",
        type: "string",
        description: "The id to use for this client."
    })
    .example([
        ['$0 -h mqtt://10.106.6.240 -p 1884 -t "spBv1.0/GrandParis/NCMD/can-spBV1.0-gateway" -m \'{"name": "Node Control/Rebirth", "type": "Boolean", "value": true}\''],
        ['$0 -h mqtts://mqtt-broker -p 8884 -t spBv1.0/group/NBIRTH/node -m \'[{"name": "Node Control/Rebirth", "type": "Boolean", "value": true}]\' -i publisher-client --insecure'],
        ['$0 -h mqtts://mqtt-broker -p 8884 -t spBv1.0/group/NBIRTH/node -m \'[{"name": "Node Control/Rebirth", "type": "Boolean", "value": true}]\' -i publisher-client --cafile ./ssl/CA.crt --key ./ssl/mqtt-broker.key --cert ./ssl/mqtt-broker.crt']
    ])
    .parseSync();

