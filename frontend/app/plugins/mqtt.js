import Vue from 'vue'

if(process.browser){

    const mqtt = require('vue-mqttsocket').default;

    let protocol = "ws" + process.env.hostname.substr(4, process.env.hostname.length);

    console.log(process.env.hostname);

    Vue.use(mqtt, {
        uri: protocol + "/mqtt/"

    });

}
