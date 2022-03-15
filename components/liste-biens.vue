<template>
  <div v-if="data.length > 0" class="liste-bien">
    <transition-group
      :class="name_liste"
      tag="div"
      name="zoom"
      :duration="500"
      :delay="0"
      class="liste-biens"
      appear
    >
      <vignette-bien
        class="vignette-bien"
        v-for="annonce in data_ready"
        :annonce="annonce"
        :key="annonce.id"
      />
    </transition-group>
  </div>
  <div
    v-else
    class="d-flex align-items-center justify-content-center flex-column"
    style="min-height: 40vh"
  >
    <fa :icon="['fa', 'times']" style="font-size: 3rem" /><br />
    <h2>Vous devriez affiner vos critères de recherche...</h2>
    <br />
    <NuxtLink to="/"> <strong>Retour à l'accueil</strong> </NuxtLink>
  </div>
</template>

<script>
export default {
  props: ['data', 'name_liste'],
  computed: {
    data_ready() {
      if (this.data) {
        return this.data.filter((item) => item.isReady)
      }
    },
  },
  mounted() {
    // avec un delai de 300ms on met isReady à true
    // juste un effet plus sympa pour lapparition des vignettes
    for (let i = 0; i < this.data.length; i++) {
      let delay = i * 300
      setTimeout(
        function () {
          this.data[i].isReady = true
        }.bind(this),
        delay
      )
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/vars/_mixin.scss';
.liste-biens {
  display: grid;
  grid-template-columns: repeat(5, minmax(300px, 1fr));
  grid-auto-rows: auto;
  gap: 1.5rem;
  @include screen-lg {
    grid-template-columns: repeat(3, minmax(300px, 1fr));
  }
  @include screen-md {
    grid-template-columns: repeat(2, minmax(300px, 1fr));
  }
  @include screen-sm {
    grid-template-columns: repeat(1, minmax(300px, 1fr));
    gap: 0;
  }
  @include screen-xs {
    grid-template-columns: repeat(1, 100%);
  }
}

.zoom-enter-active {
  animation: fadeIn 0.7s;
}
.zoom-leave-active {
  animation: fadeIn 0.4s reverse;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(1.5rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
