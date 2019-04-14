<template>
  <div class="dashboard">
    <div class="dashboard-heading-fixed">
      <div class="dashboard-header">
        <img class="logo" src="/brandweer.svg">
      </div>
      <div class="dashboard-header__user">
        <img src="/user.jpg">
        <span class="name">Jan Hein Plinsinga</span>
        <span class="function">Brandwacht, Hurdegaryp</span>
      </div>
    </div>

    <div class="dashboard-padding">
      <div class="header">
        <h1 class="header--title">Hi Jan Hein,</h1>
        <p class="header--description">Find the alert about the Hazardous Materials</p>
      </div>
      <div class="login--form">
        <form>
          <div class="input--username">
            <input type="text" class="username" placeholder="Type location or license plate">
            <router-link to="/mobile/search/shell"><img src="/icons/Crosshairs.svg"></router-link>
          </div>
          <div class="input--submit">
            <router-link type="button" to="/mobile/search/shell">Search</router-link>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>
<script>
  import Map from "~/components/Map.vue";
  export default {
    layout: 'mobile',
    data: () => ({

      // longLat: [[53.029198, 5.655435], [53.210088 ,6.537530 ]],
    }),
    components: {
      Map
    }
  }
</script>
<style lang="scss" scoped>
  .dashboard {
    display: flex;
    flex-direction: column;
    background-color: rgba(244,244,244,1);
    justify-content: flex-end;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

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
    right: 0;
    left: 0;
    position: absolute;
  }
  .dashboard-header {
    background-color: rgba(208,2,27,1);
    align-content: center;
    text-align: center;
    padding: 0 0 45px 0;
    box-shadow: 0 4px 6px 0 rgba(0,0,0,0.15);
    img.logo {
      margin: 24px 0 14px 0;
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
</style>
