# MQTT Sparkplug - subscribe

Use `sp_sub` to subscribe to MQTT Sparkplug topics.
Inspired from [mosquitto_sub](https://mosquitto.org/man/mosquitto_sub-1.html)

```bash
sp_sub --help

# subscribe to MQTT Sparkplug topics
sp_sub -h mqtt://10.106.6.240 -p 1884 -t "spBv1.0/#"
sp_sub -h mqtt://broker.hivemq.com -t "spBv1.0/#"
sp_sub -h mqtt://test.mosquitto.org -t "spBv1.0/SparkplugDevices/+/JsonScada/#" -g -v
```


## tls

```bash
sp_sub -h mqtts://test.mosquitto.org -p 8883  -t "spBv1.0/#" -g -v --insecure
sp_sub -h mqtts://broker.hivemq.com -p 8883 -t "spBv1.0/#" --insecure
```



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
# install tahu
git submodule update --init --recursive

docker build -t mqtt-sparkplug-clients .
```
then install, if you like:
```bash
echo "alias sp_sub='docker run --rm -it --init -v `pwd`:`pwd` -w `pwd` mqtt-sparkplug-clients sp_sub'" >> ~/.bash_aliases
echo "alias sp_pub='docker run --rm -it --init -v `pwd`:`pwd` -w `pwd` mqtt-sparkplug-clients sp_pub'" >> ~/.bash_aliases
```

# develop / local run

```bash
# install and build tahu/sparkplug-payload for JS (TS and protobuf files need to be built)
git submodule update --init --recursive
cd ./tahu/javascript/core/sparkplug-payload
npm install
npm run build

# back to the root directory
cd ~/workspace/mqtt-sparkplug-clients
npm install
npm run sp_sub -- -h mqtt://10.106.6.240 -p 1884 -t "spBv1.0/#"
npm run sp_sub -- -h mqtts://test.mosquitto.org -p 8883 -t "spBv1.0/#" -i client-id --cafile ./ssl/mosquitto.org.crt -g -v
```

# public MQTT broker

see the features the public test server has to offer at https://test.mosquitto.org/