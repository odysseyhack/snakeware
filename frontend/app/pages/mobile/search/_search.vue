<template>
  <div class="dashboard">
    <div class="dashboard-heading-fixed">
      <div class="dashboard-header">
        <router-link to="/mobile/dashboard">
          <img class="logo" src="/brandweer.svg">
        </router-link>

        <ul class="dashboard-header__tabs">
          <li>
            <span class="dashboard-header__tab" v-bind:class="{ active: toggle === true }" v-on:click="toggleTab(true)">LOCATION</span>
          </li>
          <li>
            <span class="dashboard-header__tab" v-bind:class="{ active: toggle === false }" v-on:click="toggleTab(false)">LIST DETAILS</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="dashboard-map" v-bind:class="{ active: toggle === true }">
      <Map class="dashboard-map__map" :callback="openOverlay" :zoom="13" :markers="markers"></Map>
      <div class="dashboard-map__overlay" v-if="activeMarker">
        <div v-html="activeMarker.description"></div>
        <div class="input--submit">
          <span v-on:click="toggleTab(false)">List details</span>
        </div>

      </div>
    </div>
    <div class="dashboard-list" v-bind:class="{ active: toggle === false }">
      <div v-show="loader">
        <div class="header">
          <h1 class="header--title">Please wait</h1>
          <p class="header--description">Fetching the key / token</p>
          <div class="getting-key">
            <img class="company-logo" src="/logoSingleShell.svg">
            <span class="key">
              <img src="/icons/Key.svg">
              <span>y@5MGT9J5J8fzS</span>
            </span>
            <span class="progress">
              <span class="progress-inner" v-bind:class="{ active: loader === true }"></span>
            </span>
          </div>
        </div>
      </div>
      <div class="advise" v-show="!loader" v-bind:class="{ active: advise === true }">
        <h1>Advice</h1>
        <div class="card">
          <img src="/blusser1.png">
          <div class="data">
            <h2>BRB 300-07 Poederblusser</h2>
            <ul>
              <li>Negatief katalytische werking</li>
              <li>Smelt bij verhitting samen tot dunne gesloten laag</li>
              <li>Spuit op vaste stof: vlamdovend</li>
              <li>Spuit op gloeiend materiaal: dunne zoutkorst die zuurstof afsluit</li>
              <li>Is tevens toepasbaar bij elektriciteitsbranden</li>
            </ul>
          </div>

        </div>
        <div class="card">
          <img src="/blusser2.png">
          <div class="data">
            <h2>Schuimvormende armaturen (Hosemaster) BRB 300-04</h2>
            <ul>
              <li>Alcoholbestendig</li>
              <li>Zowel bij polaire stoffen (mengbaar met water) alsa-polaire stoffen (niet mengbaar met water) te gebruiken</li>
              <li>Te gebruiken tot -14 oC</li>
            </ul>
          </div>
        </div>
        <div class="feedback">
          <h3>Was this helpful?</h3>
          <img src="/icons/angry1.svg">
          <img src="/icons/angry2.svg">
          <img src="/icons/angry3.svg">
          <img src="/icons/angry4.svg">
        </div>
      </div>
      <div v-show="!loader">
        <ul>
          <li class="dashboard-listitem">
          <span class="dashboard-listitem__material-icon">
            <span class="first">36</span>
             <span>1223</span>
          </span>
            <div class="dashboard-listitem__data">
              <span class="dashboard-listitem__title">Oxiraanmethanol 4-Methylbenzeensulfonaat</span>
              <span class="dashboard-listitem__amount"><span class="label">AMOUNT</span><span class="value">2232</span></span></span>
            </div>
          </li>
          <li class="dashboard-listitem">
          <span class="dashboard-listitem__material-icon">
            <span class="first">36</span>
             <span>1223</span>
          </span>
            <div class="dashboard-listitem__data">
              <span class="dashboard-listitem__title">Oxiraanmethanol 4-Methylbenzeensulfonaat</span>
              <span class="dashboard-listitem__amount"><span class="label">AMOUNT</span><span class="value">2232</span></span></span>
            </div>
          </li>
          <li class="dashboard-listitem">
          <span class="dashboard-listitem__material-icon">
            <span class="first">36</span>
             <span>1223</span>
          </span>
            <div class="dashboard-listitem__data">
              <span class="dashboard-listitem__title">Oxiraanmethanol 4-Methylbenzeensulfonaat</span>
              <span class="dashboard-listitem__amount"><span class="label">AMOUNT</span><span class="value">2232</span></span></span>
            </div>
          </li>
        </ul>
        <div class="input--submit">
          <span v-on:click="toggleAdvise()">Advise now</span>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
  import Map from "~/components/Map.vue";
  export default {
    layout: 'mobile',
    data: () => ({
      overlayDesc: '',
      toggle: true,
      loader: false,
      newLocation: true,
      loadingStatus: 0,
      advise: false,
      activeMarker: null,
      markers: [
        {
          id: 1,
          position: [53.214470, 6.566480],
          description: '<h1>Suikerunie</h1><p>Fabriekslaan 12<br /> 9745 AG Groningen</p>',
        },
        {
          id: 2,
          position: [53.212660, 6.539230],
          description: '<h1>Gulf</h1><p>Hoendiep 94<br />9743 AP Groningen</p>',
        },
        {
          id: 3,
          position: [53.192610, 6.566440],
          description: '<h1>Shell</h1><p>Van Ketwich Verschuurlaan 106<br />9721 SW Groningen</p>',
        }
      ]
      // longLat: [[53.029198, 5.655435], [53.210088 ,6.537530 ]],
    }),
    components: {
      Map
    },
    methods: {
      openOverlay(data) {
        this.activeMarker = data;
        this.newLocation = true;
      },
      toggleAdvise() {
        this.advise = !this.advise;
      },
      toggleTab(type) {
        console.log(type);
        this.advise = false;
        this.toggle = type;
        if(this.toggle === false) {

          const self = this;
          setTimeout(function(e){ self.loader = false; self.newLocation = false; }, 2000);
          if(this.newLocation === true) {
            this.loader = true;
          }
        }
      }
    }
  }
</script>
<style lang="scss">
  .feedback {
    margin: 40px 0 0 0;
    h3 {
      font-weight: 600;
      margin: 0 0 10px 0;
      font-size: 16px;
    }
  }
  .advise {
    background-color: #f4f4f4;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
    transition: 0.2s ease-in-out all;
    padding: 38px;
    transform: translateY(100%);
    &.active {
      transform: translateY(0);
    }
    h1 {
      font-size: 2rem;
      font-weight: 500;
      margin: 0 0 10px 0;
    }
    .card {
      margin: 0 0 15px 0;
      box-shadow: 0 10px 20px 0 rgba(30,30,30,0.06);
      background-color: #fff;
      overflow: auto;
      .data {
        padding: 20px 20px;
        float: left;
        width: 100%;
        background-color: #fff;
      }
      h2 {
        font-size: 15px;
        font-weight: 600;
        margin: 0;
        margin: 0 0 5px 0;
      }
      ul {
        li {
          margin-left: 1rem;
          padding: 3px 0;
        }
        font-size: 1.2rem;
        list-style-type: inside;
      }
      img {
        float: left;
        width: 100%;

      }
    }
  }
  .dashboard {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .dashboard-map__overlay {
    position: absolute;
    bottom: 0;
    left: 20px;
    right: 20px;
    padding: 20px;
    z-index: 999999;
    background-color: #fff;
    border-radius: 4px 4px 0 0;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.5);
    h1 {
      font-size: 2rem;
      font-weight: 500;
      color: rgba(64,64,64,1);
      margin: 0 0 5px 0;
    }
    .input--submit span {
      margin: 20px 0 0 0;
    }
    p {
      font-size: 1.4rem;
    }
  }
  .dashboard-listitem {
    list-style-type: none;
    margin: 0 0 20px 0;
    box-shadow: 0 10px 20px 0 rgba(30,30,30,0.06);

    display: flex;
    &__data {
      background-color: #fff;
      padding: 5px 10px;
      flex: auto;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
    }
    &__title {
      font-size: 1.4rem;
    }
    &__amount {
      font-size: 1rem;
      text-align: right;
      .value {
        padding-left: 5px;
        color: rgba(0,114,234,1);
        font-weight: bold;
      }
      .label {

      }
    }
    &__material-icon {
      flex: none;
      background-color: rgba(241,150,58,1);
      border: 1px solid black;
      text-align: center;
      width: 65px;
      span {
        display: block;
        line-height: 32px;
        width: 100%;
        font-weight: 600;
        font-size: 1.4rem;
        &.first {
          border-bottom: 1px solid black;
        }
      }
    }
  }
  .dashboard-list {
    transform: translateX(100%);
    background: #f4f4f4;
    width: 100%;
    position: fixed;
    padding: 38px;
    top: 155px;
    left: 0;
    bottom: 0;
    flex-direction: column;
    justify-content: space-between;
    display: flex;
    right: 0;
    transition: 0.2s ease-in-out transform;
    &.active {
      transform: translateX(0%);
    }
  }
  .dashboard-map {
    transform: translateX(-100%);
    transition: 0.2s ease-in-out transform;
    &.active {
      transform: translateX(0%);
    }
    &__map {
      height: calc(100vh - 155px);
    }
  }
  .input--submit button {
    margin-top: 6px;
  }
  .dashboard-padding {
    padding: 38px;
  }
  .input--username img {
    position: absolute;
    top: 14px;
    right: 14px;
  }
  .dashboard-heading-fixed {
    top: 0;
    z-index: 99999999999;
    right: 0;
    left: 0;
    position: absolute;
  }
  .dashboard-header {
    background-color: rgba(208,2,27,1);
    align-content: center;
    overflow: auto;
    text-align: center;
    padding: 0 0 0 0;
    box-shadow: 0 4px 6px 0 rgba(0,0,0,0.15);
    &__tabs {
      list-style-type: none;
      li {
        float: left;
        width: 50%;

      }
    }
    &__tab {
      color: #fff;
      font-size: 1.2rem;
      padding: 8px 0;
      cursor: pointer;
      display: block;
      border-bottom: 2px solid transparent;
      width: 100%;
      &.active {
        border-bottom: 2px solid #fff;
      }
    }
    img.logo {
      margin: 24px 0 40px 0;
      height: 45px;
    }
    &__user {
      text-align: center;
      margin-top: -45px;
      span {
        display: block;
        font-size: 1.4rem;
        &.name {
          font-weight: 600;
        }
        &.function {
          font-size: 1.2rem;
        }
      }
      img {
        border-radius: 50%;
        border: 5px solid #fff;
        width: 95px;
        height: 95px;
      }
    }
  }
  .getting-key {
    text-align: center;
    margin-top: 30px;
    .company-logo {
      background: #fff;
      padding: 30px;
      border-radius: 50%;
      display: block;
      margin: 0 auto;
    }
    .progress {
      width: 100%;
      height: 4px;
      background: #fff;
      display: block;
      position: relative;

    }
    .progress-inner {
      height: 100%;
      background: rgba(10,179,156,1);
      width: 0;
      transition: 1s ease-in-out all;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      &.active {
        width: 100%;
      }
    }

    .key {
      text-align: left;
      box-shadow: 0 10px 20px 0 rgba(30,30,30,0.06);
      padding: 40px 20px 20px;
      background: #fff;
      width: 100%;
      display: block;
      margin-top: -50px;
      span {
        font-size: 1.4rem;
      }
      img {
        position: relative;
        top: 7px;
        margin-right: 10px;
      }
    }
  }
</style>
