<template>
  <header class="company-header row no-gutters justify-content-between">
    <div class="company-header__logo col-2">
      <img src="/logo.png">
    </div>
    <div class="company-header__user">
      <img src="/portret.png">
      <div>
        <div class="company-header__user__name">Alien John</div>
        <div class="company-header__user__role">Admin</div>
      </div>
    </div>


  </header>
</template>
<script>

  export default {
  }
</script>
<style lang="scss" scoped>
  .company-header {
    height: 80px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    background-color: #fff;
    z-index: 99;
    align-items: center;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.06);
    &__user {

      display: flex;
      align-items: center;
      padding: 18px 45px;
      img {
        margin-right: 15px;
      }
      div {
        display: inline-flex;
        flex-direction: column;
      }
      &__name {
        line-height: 1;
        font-size: 1.4rem;
        font-weight: 600;
        margin: 0 0 6px 0;
      }
      &__role {
        line-height: 1;
        font-size: 1.2rem;
      }
    }
    &__logo {
      padding: 18px 45px;
      img {
        height: 40px;
      }
    }
  }
</style>
