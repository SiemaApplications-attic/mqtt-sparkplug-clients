import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";



export const args = yargs(hideBin(process.argv))
    .usage("Usage: $0 [options]")
    .option('verbose', {
        alias: 'v',
        type: 'boolean',
        description: 'Run with verbose logging'
    })
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
        description: "mqtt topic to subscribe to",
        demandOption: true
    })
    .option("gunzip", {
        alias: "g",
        type: "boolean",
        description: "gunzip SparkPlug body if compressed",
        default: false,
    })
    .option("pretty", {
        type: "boolean",
        description: "'pretty-print' JSON payload",
        default: false,
    })
    .option("json", {
        alias: "j",
        type: "boolean",
        description: "output as a JSON string",
        default: false,
    })
    .example([
        ['$0 -h mqtt://10.106.6.240 -p 1884 -t "spBv1.0/#"'],
        ['$0 -h mqtt://10.106.6.240 -p 1884 -t "spBv1.0/#" | cut -c -180'],
        ['$0 -h mqtt://broker.hivemq.com -t "spBv1.0/#"'],
        ['$0 -h mqtt://test.mosquitto.org -t "spBv1.0/SparkplugDevices/+/JsonScada/#" -g -v'],
    ])
    .parseSync();

