<template>
  <div class="company-dashboard__overview col-10">
    <h1>Overview</h1>
    <company-facts :storage="storageRecords" :transport="transportRecords"></company-facts>

    <div class="row">
      <div class="col-12">
        <div class="company-dashboard__entity-overview">
          <h2>Storage</h2>
          <div class="row">
            <ul v-for="storageRecord in storageRecords" class="col-4">
              <li class="company-dashboard__entity">
                <span class="company-dashboard__entity__name">{{ getMaterialName(storageRecord.materialId) }}</span>
                <span class="company-dashboard__entity__amount storage">{{ storageRecord.amount }}<img src="/icons/storage.svg"></span>
              </li>
            </ul>
          </div>

        </div>
      </div>
      <div class="col-6">
        <div class="company-dashboard__entity-overview">
          <div class="company-dashboard__entity-header">
            <h2>Outgoing transports</h2>
            <button v-on:click="registerTransport">register transport</button>
          </div>
          <ul v-for="transportRecord in transportRecords">
            <li class="company-dashboard__entity">
              <span class="company-dashboard__entity__name">{{ getMaterialName(transportRecord.materialId) }}</span>
              <span class="company-dashboard__entity__amount transport">{{ transportRecord.amount }}<img src="/icons/transport.svg"></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-6">
        <div class="company-dashboard__entity-overview">
          <div class="company-dashboard__entity-header">
            <h2>Incomming transports</h2>
            <button v-on:click="receiveTransport">receive transport</button>
          </div>
          <ul v-for="transportRecord in transportRecords">
            <li class="company-dashboard__entity">
              <span class="company-dashboard__entity__name">{{ getMaterialName(transportRecord.materialId) }}</span>
              <span class="company-dashboard__entity__amount transport">{{ transportRecord.amount }}<img class="incomming" src="/icons/transport.svg"></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-12">
        <div class="company-dashboard__entity-overview">
          <h2>Transport</h2>
<!--          <Map v-if="showMap" :markers="markers"></Map>-->
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import CompanyFacts from '~/components/CompanyFacts.vue'
  import RequestHandler from '~/api/requestHandler.js';
  import Map from "~/components/Map.vue";

  export default {
    components: {
      CompanyFacts, Map
    },
    data() {
      return {
        storageRecords: [],
        transportRecords: [],
        materials: [],
        markers: [],
        showMap: false,
        companyId: this.$route.params.id,
        holderId: 2,
        storageId: 1
      }
    },
    methods: {
      //IF USER RECEIVES UPDATE MESSAGE, RENDER AGAIN
      getMarkers() {
        var _vue = this;
        this.storageRecords.forEach(function(record) {
          _vue.markers.push(
            {
              id: record.id,
              position: [record.longitude, record.latitude],
              description: '<p>Material: <br/> '+ _vue.getMaterialName(record.materialId) + ' </p>'
            }
          );
        });
      },
      getMaterialName(id) {
         let material = this.materials.find(x => x.materialId === id);
         if(material) {
           return material.name;
         }
      },
      async registerTransport() {
        var json = {
          holderId: 2,
          materialId: 18,
          amount: Math.floor(Math.random() * (+10 - +1)) + +10,
          storageStartId: 3,
          storageDestinationId: this.storageId
        }

        this.storageId = 2;
        this.$mqtt.publish("/registerTransport", JSON.stringify(json));

        this.getData();

      },
      async receiveTransport() {
        var json = {
          holderId: this.transportRecords[0].holderId,
          materialId: this.transportRecords[0].materialId,
          amount: this.transportRecords[0].amount,
          storageDestinationId: parseInt(this.companyId),
          transportId: this.transportRecords[0].transportId
        }

        this.storageId = 1;
        console.log(json);
        this.$mqtt.publish("/receiveTransport", JSON.stringify(json));

        this.getData();

        //Transport ontvangen HOLDERID, MATERIALID, AMMOUNT, STORAGESTARTID, STORAGEDESTINATIONID RECEIVETRANSPORT,
      },
      async getData() {
        let storageUrl = '/listStorages';
        let transportUrl = '/listTransports';
        let materialsUrl = '/listMaterials';
        let data = { holderId: 2, storageId: parseInt(this.companyId)};
        let storageRecords = await RequestHandler.requestHandler(storageUrl, 'post', data);
        this.transportRecords = await RequestHandler.requestHandler(transportUrl, 'post', data);
        this.materials = await RequestHandler.requestHandler(materialsUrl, 'post', data);


        let recordsLib = {};

        storageRecords.forEach((record) => {

          if(Object.keys(recordsLib).indexOf(record.materialId) === -1){

            recordsLib[record.materialId] = {};
            recordsLib[record.materialId].amount = record.amount;


          }else{

            recordsLib[record.materialId].amount = recordsLib[record.materialId].amount + record.amount;

          }

        });

        this.storageRecords = [];

        Object.keys(recordsLib).forEach((lib) => {

          let record = {

            amount: recordsLib[lib].amount,
            materialId: parseInt(lib)
          };



          console.log(record);

          this.storageRecords.push(record);

        });


        this.getMarkers()
        this.showMap = true;
      },
      filterData(){

      }

    },
    async mounted() {
      this.getData();
      this.$mqtt = await this.$mqtt;
      //
      // // this.$mqtt.subscribe(this.topic,{qos:1});
      //

      
      this.$mqtt.on('message', (topic, message) => {
        // this.storageRecords.push(JSON.parse(message));
        this.getData();
      });
    }

  }
</script>
<style lang="scss" scoped>
  .company-dashboard {
    &__overview {
      padding: 0 45px;
    }
    &__entity {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 5px;
      padding-bottom: 5px;
      &__name {
        font-weight: 600;
      }
      &__amount {
        font-size: 1.4rem;
        img {
          width: 25px;
          position: relative;
          top: 1px;
          padding-left: 10px;
          &.incomming {
            padding: 0 10px 0 0;
            transform: rotate(180deg);
          }
        }
        &.storage {
          img {
            top: 3px;
          }
          color: #0AB39C;
        }
        &.transport {
          color: #F1963A;
        }
      }
    }
    &__entity-header {
      display: flex;
      justify-content: space-between;
      button {
        height: 36px;
        padding: 0 15px;
        background: #0171ea;
        color: #fff;
        font-family: inherit;
        border: 0;
        font-weight: 600;
        cursor: pointer;
        font-size: 1.2rem;
      }
    }
    &__entity-overview {
      overflow: auto;
      margin: 0 0 40px 0;
      background-color: #fff;
      padding: 30px 40px;
      box-shadow: 0 9px 35px 4px rgba(0,0,0,0.03);
      ul {
        list-style-type: none;
        li {
          margin: 0 0 15px 0;
        }
      }
    }
  }

</style>
