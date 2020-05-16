const fs = require('fs');
const mqtt = require('mqtt');
const yaml = require('js-yaml');

const configFile = "./config.yaml";
const configContent = fs.readFileSync(configFile, 'utf8');
const config = yaml.safeLoad(configContent);

const rules = config.rules;

const mqttClient = mqtt.connect(config.mqtt_server);
mqttClient.on('connect', function () {
    console.log("connected to server");
    mqttClient.subscribe('#');
});
mqttClient.on('message', function (topic, message) {
    const rule = rules[topic];
    if(rule && rule['value'] == message){
        console.log("Receive: %s %s", topic, message);
        rule['messages'].forEach(element => {
            mqttClient.publish(element['topic'], element['payload']);
            console.log("Publish: %s %s", element['topic'], element['payload']);
        });
      
    }
});