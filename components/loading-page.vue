<template lang="html">
  <div>
    <div v-if="loading" class="content-loading-page">
      <p>Chargement...</p>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
  },
}
</script>

<style lang="scss" scoped>
.content-loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(#000, 0.8);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  z-index: 100;
}
</style>
