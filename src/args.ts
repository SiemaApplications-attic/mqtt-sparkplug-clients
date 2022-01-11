import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";



export const args = yargs(hideBin(process.argv))
    .completion()
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
        description: "format JSON payload",
        default: false,
    })
    .parseSync();

