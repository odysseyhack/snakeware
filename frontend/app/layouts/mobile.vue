<template>
  <div>
    <main class="mobile-app">
      <nuxt />
    </main>
  </div>


</template>
<script>
  export default {
    data:() => ({
        topics: ["/transactions"]
    }),

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

<style lang="scss">
  body {

  }
  .input--username {
    margin-bottom: 16px;
    position: relative;
    margin-top: 36px;
  }
  .input--submit button, .input--submit a, .input--submit span {
    margin-top: 32px;
    height: 48px;
    width: 100%;
    display: block;
    text-decoration: none;
    line-height: 48px;
    text-align: center;
    background-color: #0072EA;
    cursor: pointer;
    color: white;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    border: none;
  }
  input {
    height: 48px;
    width: 100%;
    background-color: #FFFFFF;
    border: none;
    box-shadow: 0 10px 20px 0 rgba(30,30,30,0.06);
    font-family: 'Montserrat', sans-serif;
    padding-left: 24px;
    color: #404040;
    font-size: 14px;
    line-height: 18px;
    padding-right: 24px;
  }

  input:hover {
    box-shadow: 0 10px 20px 0 rgba(30,30,30,0.09);

  }

  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    font-family: 'Montserrat', sans-serif;
    color: #404040;
    font-size: 14px;
    line-height: 18px;
  }
  .forgot-password {
    height: 15px;
    width: 108px;
    color: #404040;
    font-family: 'Montserrat', sans-serif;
    font-size: 12px;
    font-weight: 300;
    line-height: 15px;
    margin-top: 25px;
  }
  .header {
    margin-bottom: 15px;
  }
  .header--title {
    font-family: 'Montserrat', sans-serif;
    font-size: 24px;
    letter-spacing: -0.5px;
    color: #404040;
    line-height: 29px;
    font-weight: normal;
    margin: 0 !important;
  }
  .header--description {
    width: 248px;
    color: rgba(64,64,64,1);
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-weight: 300;
    line-height: 18px;
    margin-top: 9px;
  }
</style>
