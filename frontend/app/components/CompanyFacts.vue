<template>
  <div class="company-facts">
    <div class="row">
      <div class="col-4">
        <div class="company-facts__fact">
          <div class="company-facts__fact__icon green">
            <img src="/icons/storage.svg">
          </div>
          <div class="company-facts__fact__info">
            <span class="company-facts__fact__label">In storage</span>
            <span class="company-facts__fact__value">{{ storage.length }}</span>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="company-facts__fact">
          <div class="company-facts__fact__icon orange">
            <img src="/icons/transport.svg">
          </div>
          <div class="company-facts__fact__info">
            <span class="company-facts__fact__label">In transport</span>
            <span class="company-facts__fact__value">{{ transport.length }}</span>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="company-facts__fact">
          <div class="company-facts__fact__icon purple">
            <img src="/icons/risk.svg">
          </div>
          <div class="company-facts__fact__info">
            <span class="company-facts__fact__label">Risk level</span>
            <span class="company-facts__fact__value">34%</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    props: [ 'transport', 'storage']
  }
</script>
<style lang="scss" scoped>
  .company-facts {
    margin: 0 0 50px 0;

    &__fact {
      box-shadow: 0 9px 35px 4px rgba(0,0,0,0.03);
      background-color: #fff;
      padding: 40px;
      display: flex;
      flex-direction: row;
      &__icon {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin: 0 20px 0 0;
        text-align: center;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        &.green {
          background-color: #DAF7E8;
        }
        &.orange {
          background-color: #FFF4E5;
        }
        &.purple {
          background-color: #E8E7FF;
        }
      }
      &__info {
        display: inline-flex;
        flex-direction: column;
      }
      &__label {
        margin: 0 0 10px 0;
        font-size: 1.4rem;
        line-height: 1;
      }
      &__value {
        line-height: 1;
        font-weight: 700;
        font-size: 2.8rem;
      }
    }

  }
</style>
