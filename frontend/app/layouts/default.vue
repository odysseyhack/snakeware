<template>
  <div class="desktop">
    <company-header></company-header>

    <main class="company-dashboard">
      <div class="row justify-content-end no-gutters">
        <nav class="col-2 company-sidebar">
          <ul>
            <li>
              <router-link class="company-sidebar__item active" to="/company/1"><img src="/icons/overview.svg">Overview</router-link>
            </li>
            <li>
              <router-link class="company-sidebar__item" to="/company/1/transport"><img src="/icons/Order.svg">Storage</router-link>
            </li>
            <li>
              <router-link class="company-sidebar__item" to="/company/1/storage"><img src="/icons/transport1.svg">Transport</router-link>
            </li>
            <li>
              <router-link class="company-sidebar__item" to="/company/1/calendar"><img src="/icons/calendar.svg">Calendar</router-link>
            </li>
            <li>
              <router-link class="company-sidebar__item" to="/company/1/forecast"><img src="/icons/forecast.svg">Forecast</router-link>
            </li>
            <li>
              <router-link class="company-sidebar__item" to="/logout"><img src="/icons/logout.svg">Logout</router-link>
            </li>
          </ul>
        </nav>
        <nuxt />
      </div>

    </main>
  </div>


</template>
<script>
  import CompanyHeader from '~/components/CompanyHeader.vue'

  export default {
    components: { CompanyHeader },

    data() {
      return {

        topics: ["/transactions"]

      }
    },
    async mounted(){

      this.$mqtt = await this.$mqtt;

      this.topics.forEach((topic) => {

        this.$mqtt.subscribe(topic,{qos:1});

      });

    },
    methods:{


    },
  }
</script>

<style lang="scss" scoped>
  .company-dashboard {
    padding: 40px 0;
  }
  .company-sidebar {
    position: fixed;
    top: 80px;
    background-color: #F4F4F4;
    bottom: 0;
    left: 0;
    &__item {
      color: inherit;
      text-decoration: none;
      padding: 18px 45px;
      display: block;
      font-size: 1.4rem;
      font-weight: 600;
      border-left: 5px solid transparent;
      &.active {
        background-color: #E7F1FD;
        color: #0072EA;
        border-left: 5px solid #0072EA;
      }
      img {
        position: relative;
        top: 2px;
        padding-right: 16px;
      }
    }
  }
  .desktop {
    margin-top: 80px;
  }
</style>
