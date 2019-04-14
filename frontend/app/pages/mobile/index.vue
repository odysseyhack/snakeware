<template>
  <div class="login">
    <div class="header">
      <h1 class="header--title">Sign in</h1>
      <p class="header--description">Hazardous Materials</p>
    </div>
    <signin/>
  </div>
</template>
<script>
  import Signin from "~/components/Signin.vue";

  export default {
    layout: 'mobile',
    data: () => ({
      form: {
        username: null,
        password: null
      }
      // longLat: [[53.029198, 5.655435], [53.210088 ,6.537530 ]],
    }),
    components: {
      Signin
    }
  }
</script>
<style lang="scss">
  .login {
    background-color: #F4F4F4;
    align-content: center;
    padding: 38px;
    flex-direction: column;
    justify-content: flex-end;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

</style>
