<template>
  <div>
    <div class="container" v-if="annonce">
      <b-row class="pt-3 pb-5">
        <b-col class="text-center text-lg-left">
          <b-button variant="light" @click="$router.back()">
            <fa title="Euros" :icon="['fa', 'chevron-left']" /> Retour
          </b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="8">
          <h1>
            {{ annonce.mandat == 'achat' ? 'En Vente' : 'En Location' }}
            {{ title | capitalize }}
          </h1>
          <p class="text-lg-left text-center text-uppercase mb-0">
            {{ annonce.lieu.ville }} ({{ annonce.lieu.code_postal }})
          </p>
        </b-col>
        <b-col lg="4">
          <span v-if="annonce.mandat == 'achat'" class="prix charge_vendeur"
            >{{ parseInt(annonce.prix).toLocaleString() }}
            <fa title="Euros" :icon="['fa', 'euro-sign']"
          /></span>
          <span v-else class="prix charge_vendeur"
            >{{ parseInt(annonce.loyer).toLocaleString() }}
            <fa title="Euros" :icon="['fa', 'euro-sign']" />/mois</span
          >
        </b-col>
      </b-row>
      <b-row>
        <b-col class="mb-5">
          <galerie :annonce="annonce" />
        </b-col>
      </b-row>
      <b-row>
        <b-col class="separator">
          <h2>Liste des equipements</h2>
          <ul class="equipements" v-if="equipements">
            <li v-if="annonce.chambres">
              <fa :icon="['fa', equipements['chambres'].icon]" />
              <span
                >{{ equipements['chambres'].label }}
                <b>x {{ annonce.chambres }}</b></span
              >
            </li>
            <li v-for="(eqp, index) in annonce.equipements" :key="index">
              <fa :icon="['fa', equipements[eqp[0]].icon]" />
              <span
                >{{ equipements[eqp[0]].label }}
                <b v-if="eqp[1]">x {{ eqp[1] }}</b></span
              >
            </li>
          </ul>
        </b-col>
        <b-col lg="8">
          <h2>Plus en détail</h2>
          <p class="text-justify" v-html="annonce.description"></p>
        </b-col>
      </b-row>
      <br />
      <b-row v-if="annonce.DPE || annonce.GES">
        <b-col md="6" v-if="annonce.DPE">
          <dpe :valDPE="annonce.DPE" />
        </b-col>
        <b-col md="6" v-if="annonce.GES">
          <ges :valGES="annonce.GES" />
        </b-col>
      </b-row>
    </div>
    <div v-else class="container">chargement...</div>
  </div>
</template>

<script>
import dpe from '~/components/detail_bien/dpe.vue'
import galerie from '~/components/galerie.vue'

export default {
  components: { dpe },
  async asyncData({ params }) {
    const id = params.id
    return { id }
  },
  data() {
    return {
      annonce: null,
      equipements: null,
    }
  },
  computed: {
    title() {
      if (this.annonce) {
        return `${this.annonce.type_du_bien} ${this.annonce.surface_habitable} m²`
      }
    },
  },
  methods: {
    getDetail(id) {
      this.$axios
        .$get(
          'https://site-immo.abaze-de-donnees.fr/wp-json/api/detail/' + this.id
        )
        .then((response) => {
          this.annonce = response
          this.$store.commit('SET_PAGE_READY', true)
        })
    },
  },
  mounted() {
    if (this.id) {
      this.getDetail()
    }
    this.equipements = process.env.equipements
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/vars/_vars.scss';
@import '~/assets/scss/vars/_mixin.scss';
#content_nuxt {
  position: relative;
  z-index: 11;

  &::before {
    content: '';
    position: absolute;
    top: -5rem;
    right: -15px;
    bottom: -5rem;
    left: -15px;
    background-image: url(../../static/img/background_vector3.jpg);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.2;
    z-index: -1;
  }
}
.container {
  margin: 5rem auto;
  background-color: rgba(#fff, 0.95);
  border: 1px solid rgba(#ccc, 0.2);
}

h1 {
  font-size: 1.7rem;
  text-transform: none;
  @include screen-md {
    font-size: 1rem;
    text-align: center;
  }
}
.prix {
  position: relative;
  display: block;
  font-weight: bold;
  color: $link_color;
  font-size: 3rem;
  text-align: right;

  @include screen-md {
    font-size: 2rem;
    text-align: center;
  }

  &.charge_vendeur {
    &:after {
      content: 'Honoraires à la charge du vendeur';
      display: block;
      position: relative;
      left: 0;
      width: 100%;
      font-size: 0.55rem;
      color: initial;
      transform: translateY(-50%);
    }
  }
}
.equipements {
  padding: 0;
  list-style: none;

  li {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    svg {
      position: absolute;
      font-size: 24px;
      color: rgb(100, 71, 71);
    }
    span {
      margin-left: 2.5rem;
    }
  }
}

.separator:after {
  content: '';
  position: absolute;
  top: 0;
  right: 30px;
  display: flex;
  width: 1px;
  height: 60%;
  border-right: 1px solid #f0f0f0;
  transform: translateY(30%);
}
</style>
