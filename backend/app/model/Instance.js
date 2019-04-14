'use strict';

const axios = require('axios');

const mqtt = require('mqtt');
let mqttClient = mqtt.connect('ws://mqtt:' + process.env.mqttPort);

const dataBase = require('../exports/dataBase');
const db = new dataBase();
const admin = require('../exports/administrator');

class Instance {

    constructor() {

        this.name = "backend_processor";
        this.time = new Date();
        this.version = "1";
        this.endpoints = [];
        this.tableArray = [{name: "transports", options: {primary_key: "transportId"}},{name: "incidents", options:{}},{name: "materials", options:{}},{name: "storages"}];
        this.prefix = "/backend";
        this.internalAddress = "http://backend:3000";
        this.start();

    }

    start(){

        console.log("Microservice Started");

        mqttClient.subscribe("/registerTransport");
        mqttClient.subscribe("/receiveTransport");

        mqttClient.on("message", (topic,message) => {

            let mqttMessage = JSON.parse(message);

            console.log(mqttMessage);

            if(topic === "/registerTransport"){

                this.registerTransport(mqttMessage)

            }

            if(topic === "/receiveTransport"){

                this.receiveTransport(mqttMessage);

            }

        });

    }

    listStorages(holderId,storageId){

        return new Promise(async (reject, resolve) => {

            let records = await db.selectFilter(this.name, "storages", { holderId: parseInt(holderId), storageId: storageId, active: true});

            resolve(records);

        });
    }

    listTransports(holderId,storageId){

        return new Promise(async (reject, resolve) => {

            let records = await db.selectFilter(this.name, "transports", { holderId: parseInt(holderId), storageDestinationId: storageId, active: true});

            resolve(records);

        });

    }

    listMaterials(){

        return new Promise(async (reject, resolve) => {

            let records = await db.selectAll(this.name, "materials");

            resolve(records);

        });

    }


    registerIncident(incidentId,responseTime,longitude,latitude,materialId,risklevel){

        return new Promise(async (reject, resolve) => {

            let incident = {

                incidentId: parseInt(incidentId),
                responseTime: responseTime,
                longitude: longitude,
                latitude: latitude,
                materialId: parseInt(materialId),
                risklevel: parseInt(risklevel),
                timestamp: new Date().getTime()

            };

            let result = await db.insert(this.name,"incidents", incident);

            if (result.inserted === 1) {

                resolve({

                    message: "Incident stored in database",
                    incident: incident,
                    result: result

                });

            } else {

                reject({

                    message: "Incident not stored something went wrong",
                    incident: incident,
                    error: result

                });
            }

        });

    }

    registerTransport({holderId,materialId,amount,storageStartId,storageDestinationId}){

        return new Promise(async (reject, resolve) => {

            let transportId = await db.selectMax(this.name,"transports","transportId");

            console.log(transportId);

            if(transportId === 0){

                transportId = 1;

            }else{

                transportId = transportId.transportId + 1;

            }

            let transport = {

                holderId: parseInt(holderId),
                materialId: parseInt(materialId),
                amount: parseInt(amount),
                storageStartId: storageStartId,
                storageDestinationId: storageDestinationId,
                transportId: transportId,
                active: true,
                timestamp: new Date().getTime()

            };

            let storage = {

                holderId: parseInt(holderId),
                materialId: parseInt(materialId),
                amount: 0 - parseInt(amount),
                storageId: storageStartId,
                active: true,
                timestamp: new Date().getTime()

            };

            let updateStorage = await db.insert(this.name,"storages", storage);

            let result = await db.insert(this.name, "transports", transport);

            if (result.inserted === 1) {

                resolve({

                    message: "Transport stored in database",
                    incident: transport,
                    result: result

                });

            } else {

                reject({

                    message: "Transport not stored something went wrong",
                    incident: transport,
                    error: result

                });
            }

        });

    }

    receiveTransport({holderId,materialId,amount,storageDestinationId,transportId}){

        return new Promise(async (reject, resolve) => {

            let storage = {

                holderId: parseInt(holderId),
                materialId: parseInt(materialId),
                amount: parseInt(amount),
                storageId: parseInt(storageDestinationId),
                active: true,
                timestamp: new Date().getTime()

            };

            let result = await db.insert(this.name, "storages", storage);

            let updateTransport = await db.filterUpdate(this.name,"transports", {transportId: transportId},{active: false});

            console.log("storage++++++++++++++++++++++++++++++++++++");
            console.log(storage);
            if(result.inserted === 1 && updateTransport.updated === 1) {

                resolve({

                    message: "Transport reception stored in database",
                    incident: storage,
                    result: result

                });

            }else{

                reject({

                    message: "Transport reception not stored something went wrong",
                    incident: storage,
                    error: result

                });

            }

        });

    }



}

module.exports = Instance;
