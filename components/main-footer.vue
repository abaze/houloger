<template>
  <div class="footer">
    <b-container>
      <b-row class="text-center">
        <b-col lg="6" class="text-lg-left">
          Houloger.com, All rights reserved - {{ new Date().getFullYear() }}
        </b-col>
        <b-col lg="6" class="text-lg-right">
          <a>Confidentialité</a>
          <a>Plan du site</a>
          <a>Nous contacter</a>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/vars/_mixin.scss';
.footer {
  padding: rem-calc(30) 0;
  background-color: rgb(0, 0, 0);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  .container {
    color: #fff;

    a {
      color: #fff;
      & + a {
        margin-left: 1em;
      }
    }
  }
}
</style>
