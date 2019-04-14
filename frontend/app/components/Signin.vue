<template>
  <div class="login--form">
    <form
      @submit="checkLogin"
      action="/mobile/dashboard"
      method="post">
      <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>
      <div class="input--username">
        <input type="text" class="username" v-model="form.username" placeholder="Username">
      </div>
      <div class="input--password">
        <input type="password" v-model="form.password" placeholder="Password">
      </div>
      <div class="input--submit">
        <button type="submit">Sign In</button>
      </div>
    </form>
    <p class="forgot-password">Forgot password?</p>
  </div>
</template>
<script>
  export default {
    layout: 'mobile',
    data: () => ({
      errors: [],
      form: {
        username: null,
        password: null
      }
      // longLat: [[53.029198, 5.655435], [53.210088 ,6.537530 ]],
    }),
    methods: {
      checkLogin: function(e) {
        if (this.form.username && this.form.password) {
          return true
        }

        this.errors = [];

        if (!this.form.username) {
          this.errors.push('Username is required');
        }
        if (!this.form.password) {
          this.errors.push('Password is required');
        }
        e.preventDefault()
      }
    }
  }
</script>
<style lang="scss">

</style>

