Subscribe to MQTT SparkPlug topics.
It was called sp_sub for SparkPlug subscribe (similar to [mosquitto_sub](https://mosquitto.org/man/mosquitto_sub-1.html)).


# build

```bash
docker build -t sp_sub .
echo "alias sp_sub='docker run --rm -it sp_sub sp_sub'" >> ~/.bash_aliases
```

# run
```bash
sp_sub --help
sp_sub -h mqtt://broker.hivemq.com -t "spBv1.0/ICSEdge/#"
sp_sub -h mqtt://test.mosquitto.org -t "spBv1.0/Sparkplug B Devices/+/JSON-SCADA Server/#" -g -v
```

# options

```
Usage: sp_sub [options]

Options:
      --help     Show help                                             [boolean]
      --version  Show version number                                   [boolean]
  -v, --verbose  Run with verbose logging                              [boolean]
  -h, --host     mqtt host to connect to  [string] [default: "mqtt://localhost"]
  -p, --port     network port to connect to             [number] [default: 1883]
  -t, --topic    mqtt topic to subscribe to                  [string] [required]
  -g, --gunzip   gunzip SparkPlug body if compressed  [boolean] [default: false]
      --pretty   'pretty-print' JSON payload          [boolean] [default: false]

Examples:
  sp_sub -h mqtt://10.106.6.240 -p 1884 -t "spBv1.0/#"
  sp_sub -h mqtt://10.106.6.240 -p 1884 -t "spBv1.0/#" | cut -c -180
  sp_sub -h mqtt://broker.hivemq.com -t "spBv1.0/ICSEdge/#"
  sp_sub -h mqtt://test.mosquitto.org -t "spBv1.0/Sparkplug B Devices/+/JSON-SCADA Server/#" -g -v
```
