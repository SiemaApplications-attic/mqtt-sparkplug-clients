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
    .example([
        ['$0 -h mqtt://10.106.6.240 -p 1884 -t "spBv1.0/GrandParis/NCMD/can-spBV1.0-gateway" -m \'{"name": "Node Control/Rebirth", "type": "Boolean", "value": true}\''],
    ])
    .parseSync();

