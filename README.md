# MQTT Sparkplug - subscribe

Use `sp_sub` to subscribe to MQTT Sparkplug topics.

```bash
sp_sub --help

# subscribe to MQTT Sparkplug topics
sp_sub -h mqtt://10.106.6.240 -p 1884 -t "spBv1.0/#"
sp_sub -h mqtt://broker.hivemq.com -t "spBv1.0/#"
sp_sub -h mqtt://test.mosquitto.org -t "spBv1.0/SparkplugDevices/+/JsonScada/#" -g -v
```

Inspired from [mosquitto_sub](https://mosquitto.org/man/mosquitto_sub-1.html)



# MQTT Sparkplug - publish

Use `sp_pub` to bundle MQTT Sparkplug metrics into an MQTT Sparkplug payload, and publish that payload.

```bash
sp_pub --help

# publish MQTT Sparkplug topics
sp_pub \
  -h mqtt://10.106.6.240 \
  -p 1884 \
  -t "spBv1.0/GrandParis/NCMD/can-spBV1.0-gateway" \
  -m '[{"name": "Node Control/Rebirth", "type": "Boolean", "value": true}]'
```


# build

```bash
docker build -t mqtt-sparkplug-clients .
```
then install, if you like:
```bash
echo "alias sp_sub='docker run --rm -it --init mqtt-sparkplug-clients sp_sub'" >> ~/.bash_aliases
echo "alias sp_pub='docker run --rm -it --init mqtt-sparkplug-clients sp_pub'" >> ~/.bash_aliases
```

# develop / local run

```bash
npm install
npm run sp_sub -- -h mqtt://10.106.6.240 -p 1884 -t "spBv1.0/#"
```
