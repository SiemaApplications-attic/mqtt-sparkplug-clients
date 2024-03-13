FROM node:18.11.0-alpine3.16 as tahu-builder

COPY tahu /tahu
WORKDIR /tahu/javascript/core/sparkplug-payload
RUN npm install
RUN npm run build


FROM node:18.11.0-alpine3.16

RUN mkdir /app
WORKDIR /app

COPY --from=tahu-builder \
    /tahu/javascript/core/sparkplug-payload/index.d.ts \
    /tahu/javascript/core/sparkplug-payload/index.js \
    /tahu/javascript/core/sparkplug-payload/package.json \
    /tahu/javascript/core/sparkplug-payload/package-lock.json \
    ./tahu/javascript/core/sparkplug-payload/

COPY --from=tahu-builder \
    /tahu/javascript/core/sparkplug-payload/lib/sparkplugbpayload.d.ts \
    /tahu/javascript/core/sparkplug-payload/lib/sparkplugbpayload.js \
    /tahu/javascript/core/sparkplug-payload/lib/sparkplugPayloadProto.d.ts \
    /tahu/javascript/core/sparkplug-payload/lib/sparkplugPayloadProto.js \
    ./tahu/javascript/core/sparkplug-payload/lib/

COPY package.json package-lock.json ./

RUN npm install

COPY tsconfig.json src ./

RUN npm run transpile
RUN npm run build

RUN rm -rf ./node_modules

