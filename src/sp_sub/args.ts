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
    .option("subscribe-metric", {
        type:"string",
        description:"filter out metrics not matching regexp provided"
    })
    .example([
        ['$0 -h mqtt://mqtt-broker -p 1884 -t "spBv1.0/#"'],
        ['$0 -h mqtt://broker.hivemq.com -t "spBv1.0/#"'],
        ['$0 -h mqtt://test.mosquitto.org -t "spBv1.0/SparkplugDevices/+/JsonScada/#" -g -v'],
        ['$0 -h mqtts://test.mosquitto.org -p 8883 -t "spBv1.0/#" -i client-id --insecure'],
        ['$0 -h mqtts://test.mosquitto.org -p 8883 -t "spBv1.0/#" -i client-id --cafile ./ssl/mosquitto.org.crt -g -v'],
        ['$0 -h mqtts://test.mosquitto.org -p 8884 -t "spBv1.0/#" -i client-id --cafile ./ssl/mosquitto.org.crt --key ./ssl/mqtt-broker.key --cert ./ssl/mqtt-broker.crt'],
        ['$0 -h mqtts://test.mosquitto.org -p 8886 -t "spBv1.0/#" -i client-id'],
    ])
    .parseSync();

