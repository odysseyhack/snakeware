<template>
  <div class="company-dashboard__overview col-10">
    <h1>Overview</h1>
    <company-facts :storage="storageRecords" :transport="transportRecords"></company-facts>

    <div class="row">
      <div class="col-12">
        <div class="company-dashboard__entity-overview">
          <h2>Storage</h2>
          <ul v-for="storageRecord in storageRecords">
            <li class="company-dashboard__entity half">
              <span class="company-dashboard__entity__name">{{ getMaterialName(storageRecord.materialId) }}</span>
              <span class="company-dashboard__entity__amount storage">{{ storageRecord.amount }}<img src="/icons/storage.svg"></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-6">
        <div class="company-dashboard__entity-overview">
          <h2>Outgoing transports</h2>
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
          <h2>Incomming transports</h2>
          <ul v-for="transportRecord in transportRecords">
            <li class="company-dashboard__entity">
              <span class="company-dashboard__entity__name">{{ getMaterialName(transportRecord.materialId) }}</span>
              <span class="company-dashboard__entity__amount transport">{{ transportRecord.amount }}<img src="/icons/transport.svg"></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-12">
        <div class="company-dashboard__entity-overview">
          <h2>Transport</h2>
          <Map v-if="showMap" :markers="markers"></Map>
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
        showMap: false
      }
    },
    methods: {
      getMarkers() {
        var _vue = this;
          this.storageRecords.forEach(function(record) {
            _vue.markers.push(
              {
                id: record.id,
                position: [record.longitude, record.latitude],
                description: '<p>Material: <br/> '+ record.materialId + ' </p>'
              }
            );
          });
      },
      getMaterialName(id) {
        let material = this.materials.find(x => x.materialId === id);
        if(material) {
          return material.name;
        }
      }
    },
    async mounted() {
      let storageUrl = '/listStorageTransactions';
      let transportUrl = '/listTransportTransactions';
      let materialsUrl = '/listMaterials';
      let data = { holderId: 2};
      this.storageRecords = await RequestHandler.requestHandler(storageUrl, 'post', data);
      this.transportRecords = await RequestHandler.requestHandler(transportUrl, 'post', data);
      this.materials = await RequestHandler.requestHandler(materialsUrl, 'post', data);
      this.$mqtt = await this.$mqtt;
      //
      // // this.$mqtt.subscribe(this.topic,{qos:1});
      //
      // this.getMarkers();

      this.getMarkers()
      this.showMap = true;


      this.$mqtt.on('message', (topic, message) => {
        this.storageRecords.push(JSON.parse(message));
      });


    },

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
      padding: 5px 0;
      &.half {
        width: 33%;
        padding: 0 10px;
        float: left;
      }
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
    &__entity-overview {
      overflow: auto;
      margin: 0 0 40px 0;
      background-color: #fff;
      padding: 30px 40px;
      box-shadow: 0 9px 35px 4px rgba(0,0,0,0.03);
      ul {
        list-style-type: none;
        li {
          margin: 0 0 10px 0;
        }
      }
    }
  }

</style>
