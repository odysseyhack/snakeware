<template>
  <div>
      <l-map class="mini-map" :zoom="zoom" :center="markers ? markers[0].position : nullMarker">
        <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
        <l-polyline :latLngs="longlat" waypointMode="snap"></l-polyline>
        <l-marker v-if="markers !== null" v-for="mark in markers" :key="mark.id" :lat-lng="mark.position" :draggable="draggable" v-on:click="test(mark)">
          <l-popup :content="mark.description" v-if="!callback"></l-popup>
        </l-marker>
      </l-map>
  </div>
</template>

<script>
  export default {
    props: {
      longlat: {
        required: false
      },
      markers: {
        required: false,
      },
      callback: {
        required: false
      },
      zoom: {
        default: 10,
        required: false
      }
    },
    data: () => ({
      draggable: false,
      nullMarker: [53.204820, 6.555459]
    }),
    methods: {
      test: function(desc) {
        this.callback(desc);
      }
    }
  };
</script>

<style src="leaflet/dist/leaflet.css"></style>
<style >
  .mini-map {
    width: 100%;
  }
</style>

