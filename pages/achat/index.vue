<template>
  <div>
    <b-row class="mt-5 mb-5">
      <b-col class="relative">
        <h1 v-if="annonces" class="text-center">
          <span v-if="isRequest && annonces.length >= 2">
            Ces
            <strong class="text-warning">{{ annonces.length }}</strong> biens
            pourraient vous intéresser</span
          >
          <span v-else-if="isRequest && annonces.length === 1">
            Ce bien pourrait vous intéresser</span
          >
          <span v-else-if="isRequest && annonces.length === 0">
            Aucun bien trouvé pour votre recherche</span
          >
          <span v-else>Nos biens disponibles à la vente</span>
          <img src="/img/background_vector2.jpg" />
        </h1>
        <br />
        <b-row>
          <b-col>
            <liste-biens
              class="w-100"
              v-if="annonces"
              :name="'liste-all-biens'"
              :data="annonces"
            ></liste-biens>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      annonces: null,
    }
  },

  computed: {
    isReady() {
      return this.$store.state.isReady
    },
    isRequest() {
      return window.location.search !== '' ? true : false
    },
  },
  methods: {
    getAnnonces(params = '?vente_location=achat') {
      console.log('params : ' + params)
      this.$axios
        .$get(
          'https://site-immo.abaze-de-donnees.fr/wp-json/api/annonces/search/' +
            params
        )
        .then((response) => {
          this.annonces = response.map((item) => {
            item = { ...item, isReady: false }
            return item
          })
          this.$store.commit('SET_PAGE_READY', true)
        })
    },
    requestWP(params) {
      var params = new URLSearchParams(window.location.search)
      return '?' + params
    },
    getFakeAnnonces() {
      return {
        chambres: 3,
        description:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab sint voluptates libero aperiam, ipsam temporibus sapiente, qui mollitia neque facere voluptas nam in sequi! Cupiditate, nisi? Molestiae eaque labore natus.',
        id: 'd-' + Math.random(100),
        photos: [
          {
            medium_large:
              'https://picsum.photos/600/' +
              Math.floor(Math.random() * 200 + 600) +
              '?random&t=' +
              new Date().getTime(),
          },
        ],
        prix: Math.floor(Math.random() * 100000 + 600000).toString(),
        superficie: Math.floor(Math.random() * 50 + 500).toString(),
        surface_habitable: Math.floor(Math.random() * 50 + 500).toString(),
        title: 'Test',
        type_du_bien: 'Appartement',
        lieu: {
          code_postal: Math.floor(Math.random() * 10000 + 99000).toString(),
          ville: 'Paris',
        },
      }
    },
  },
  mounted() {
    if (this.isRequest) {
      this.getAnnonces(this.requestWP(window.location.search))
    } else {
      this.getAnnonces()
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/vars/_mixin.scss';
h1 {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 15vh;
  padding: 0;
  color: #0f0f0f;
  z-index: 0;
  overflow: hidden;
  text-shadow: 1px 1px 1px rgba(#000, 0.1);
  font-size: 2rem;
  @include screen-md {
    height: 15vh;
    font-size: 1.5rem;
  }
  @include screen-sm {
    font-size: 1.2rem;
  }
  @include screen-xs {
    height: 10vh;
    font-size: 0.9rem;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0%;
    z-index: -1;
    -o-object-fit: cover;
    object-fit: cover;
    opacity: 0.3;
    transform: translateY(-50%);
    @include screen-md {
      transform: translateY(-60%);
    }
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(#ccc, 0.2);
    z-index: -1;
  }
}
</style>
