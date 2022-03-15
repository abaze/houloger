<template>
  <div id="formSlide">
    <div class="timeline mb-5">
      <ul>
        <li
          :class="{ active: slideIndex >= 1 }"
          title="Pour quel type de projet ?"
        >
          <fa :icon="['fa', 'map-signs']" />
        </li>
        <li
          :class="{ active: slideIndex >= 2 }"
          title="Pour quel type de bien ?"
        >
          <fa :icon="['fa', 'home']" />
        </li>
        <li
          :class="{ active: slideIndex >= 3 }"
          title="Nombre de chambre minimum ?"
        >
          <fa :icon="['fa', 'bed']" />
        </li>
      </ul>
      <div class="line">
        <div class="fill"></div>
      </div>
    </div>
    <div class="slide-form">
      <b-row class="justify-content-center">
        <b-col lg="8">
          <b-form class="form-slide">
            <transition name="slide" mode="out-in">
              <div
                v-if="isActiveSlide === 'slide-1'"
                class="slide"
                key="slide1"
              >
                <b-form-group>
                  <label>Pour quel type de projet&nbsp;?</label>
                  <b-form-radio-group
                    class="w-100"
                    id="btn-radios-3"
                    v-model="list_options.vente_location.selected"
                    :options="list_options.vente_location.options"
                    value-field="data"
                    text-field="data.text"
                    name="radio-btn-stacked"
                    size="lg"
                    buttons
                    button-variant="outline-secondary"
                  ></b-form-radio-group>
                </b-form-group>
                <div class="btn-nav">
                  <b-button-group size="lg">
                    <b-button
                      type="button"
                      variant="light"
                      @click="check_slide('slide-1', 'prev')"
                      >Etape Précédente</b-button
                    >
                    <b-button
                      type="button"
                      variant="light"
                      :disabled="!list_options.vente_location.selected.value"
                      @click="check_slide('slide-1', 'next')"
                      >Etape suivante</b-button
                    >
                  </b-button-group>
                </div>
              </div>
              <div
                v-if="isActiveSlide === 'slide-2'"
                class="slide"
                key="slide2"
              >
                <b-form-group>
                  <label>Pour quel type de bien&nbsp;?</label>
                  <b-form-radio-group
                    class="w-100"
                    id="btn-radios-3"
                    v-model="list_options.type_bien.selected"
                    :options="list_options.type_bien.options"
                    value-field="data"
                    text-field="data.text"
                    name="radio-btn-stacked"
                    size="lg"
                    buttons
                    button-variant="outline-secondary"
                  ></b-form-radio-group>
                </b-form-group>
                <div class="btn-nav">
                  <b-button-group size="lg">
                    <b-button
                      type="button"
                      variant="light"
                      @click="check_slide('slide-2', 'prev')"
                      >Etape Précédente</b-button
                    >
                    <b-button
                      type="button"
                      variant="light"
                      :disabled="!list_options.type_bien.selected.value"
                      @click="check_slide('slide-2', 'next')"
                      >Etape suivante</b-button
                    >
                  </b-button-group>
                </div>
              </div>

              <div
                v-if="isActiveSlide === 'slide-3'"
                class="slide"
                key="slide3"
              >
                <b-form-group>
                  <label>Nombre de chambre minimum&nbsp;?</label>
                  <b-form-radio-group
                    class="w-100"
                    id="btn-radios-4"
                    v-model="list_options.chambres.selected"
                    :options="list_options.chambres.options"
                    value-field="data"
                    text-field="data.value"
                    name="radio-btn-stacked"
                    size="lg"
                    buttons
                    button-variant="outline-secondary"
                  ></b-form-radio-group>
                </b-form-group>
                <div class="btn-nav">
                  <b-button-group size="lg">
                    <b-button
                      type="button"
                      variant="light"
                      @click="check_slide('slide-3', 'prev')"
                      >Etape Précédente</b-button
                    >
                    <b-button
                      :disabled="!list_options.chambres.selected.value"
                      @click="search"
                      type="button"
                      variant="success"
                    >
                      Lancer la recherche
                      <fa v-if="load_search" icon="circle-notch" spin />
                    </b-button>
                  </b-button-group>
                </div>
              </div>
            </transition>
          </b-form>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      autocomplete: null,
      show: true,
      active: false,
      load_search: false,
      list_slide: [
        {
          slide: 'slide-1',
          active: true,
          next: 'slide-2',
        },
        {
          slide: 'slide-2',
          active: null,
          prev: 'slide-1',
          next: 'slide-3',
        },
        {
          slide: 'slide-3',
          active: null,
          prev: 'slide-2',
          next: 'slide-4',
        },
      ],
      list_options: {
        vente_location: {
          options: [
            { data: { text: 'Achat', value: 'achat' } },
            { data: { text: 'Location', value: 'location' } },
          ],
          selected: '',
        },
        type_bien: {
          options: [
            { data: { text: 'Appartement', value: 'appartement' } },
            { data: { text: 'Maison', value: 'maison' } },
          ],
          selected: '',
        },
        chambres: {
          options: [
            { data: { text: '1 chambre et plus', value: '1' } },
            { data: { text: '2 chambres et plus', value: '2' } },
            { data: { text: '3 chambres et plus', value: '3' } },
            { data: { text: '4 chambres et plus', value: '4' } },
            { data: { text: '5 chambres et plus', value: '5' } },
          ],
          selected: '',
        },
      },
      list_selected: null,
    }
  },
  computed: {
    isActiveSlide() {
      return this.list_slide.find((s) => s.active === true).slide
    },
    slideIndex() {
      return (
        this.list_slide.findIndex((s) => s.slide === this.isActiveSlide) + 1
      )
    },
  },
  watch: {
    list_options: {
      handler: function (val, oldVal) {
        let options = {}
        this.list_options.vente_location.selected.value
          ? (options.vente_location = this.list_options.vente_location.selected.value)
          : ''
        this.list_options.type_bien.selected.value
          ? (options.type_bien = this.list_options.type_bien.selected.value)
          : ''
        this.list_options.chambres.selected.value
          ? (options.chambres = this.list_options.chambres.selected.value)
          : ''
        this.list_selected = options
      },
      deep: true,
    },
  },
  methods: {
    check_slide(current, move) {
      // on affiche la slide prev ou next en fonction des arguments
      let _this = this
      let currentSlideIndex =
        this.list_slide.findIndex((slide) => slide.slide === current) | null

      if (this.list_slide[currentSlideIndex][move]) {
        let targetSlideIndex = this.list_slide.findIndex(
          (slide) => slide.slide === _this.list_slide[currentSlideIndex][move]
        )
        this.list_slide[currentSlideIndex].active = false
        this.list_slide[targetSlideIndex].active = true

        //avec l'index de la target slide on rempli la jauge
        this.fillProgressBar(targetSlideIndex + 1)
      } else {
        return null
      }
    },
    fillProgressBar(step, total = 3) {
      let line = document.querySelector('#formSlide .timeline .line')
      let fill = line.querySelector('.fill')

      let part = parseFloat((100 * step) / total).toFixed(2)
      fill.style.width = part + '%'
    },
    search() {
      let _this = this
      let page = this.list_selected.projet || 'achat'
      let params = new URLSearchParams(this.list_selected).toString()
      let url_result = `/${page}/?${params}`
      this.load_search = true
      setTimeout(function () {
        _this.load_search = false
        _this.$router.push({ path: url_result })
        _this.$store.commit('SET_SHOW_SLIDE_FORM', false)
      }, 3000)
    },
  },
  mounted() {
    this.fillProgressBar(1)
  },
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/vars/_mixin.scss';

#formSlide {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
}
.timeline {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 1em auto;

  ul {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    padding: 0;
    margin: 0;

    li {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 65px;
      height: 65px;
      z-index: 2;
      background-color: #5671b4;
      padding: 0.5rem 1rem;
      font-size: 2rem;
      color: #fff;
      text-align: center;
      clip-path: circle(49% at 50% 50%);

      @include screen-xs {
        width: 45px;
        height: 45px;
        font-size: 1rem;
      }

      &.active {
        &:before {
          transform: translateX(-50%) translateY(-78%);
          height: 250%;
        }

        svg {
          animation: float 2s ease-in-out infinite 2s;
        }
      }

      &:before {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 200%;
        height: 200%;
        background-color: orange;
        z-index: 0;
        transform: translateX(-50%) translateY(-40%);
        animation: water 4s ease-in-out infinite;
        transition: transform 3s ease-in, height 3s ease-in;
      }

      svg {
        z-index: 1;
      }
    }
  }

  .line {
    position: absolute;
    right: 0;
    left: 0;
    height: 10px;
    background-color: #5671b4;
    border-radius: 5px;
    overflow: hidden;
    z-index: 0;

    .fill {
      width: 0%;
      height: 100%;
      background-color: orange;
      z-index: 1;
      transition: width 1s ease-in;
    }
  }
}

.slide-form {
  padding: 1.5rem;
  margin-bottom: 5em;

  .slide {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1em 0;
    height: 30vh;

    .btn-nav {
      margin-top: 3em;
      .btn {
        font-size: 1rem;
      }
    }
  }
}

/* Transition Slide Form */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s, opacity 0.3s;
}
.slide-enter, .slide-leave-to /* .slide-leave-active below version 2.1.8 */ {
  transform: translateX(100px);
  opacity: 0;
}

@keyframes water {
  0%,
  100% {
    clip-path: polygon(
      0% 0%,
      15% 44%,
      32% 50%,
      54% 60%,
      70% 61%,
      84% 59%,
      100% 52%,
      100% 100%,
      0% 100%
    );
  }
  50% {
    clip-path: polygon(
      0% 50%,
      16% 65%,
      34% 66%,
      51% 62%,
      67% 50%,
      84% 45%,
      100% 45%,
      100% 100%,
      0% 100%
    );
  }
}

@keyframes float {
  0%,
  100% {
    transform: rotate(10deg);
  }
  50% {
    transform: rotate(-15deg);
  }
}
</style>
<style>
/* SLIDE FORM */

#formSlide .form-group label:not(.btn) {
  display: block;
  font-size: 1.5rem;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 3em;
  text-align: center;
}

@media (max-width: 767px) {
  #formSlide .form-group label:not(.btn) {
    font-size: 1rem;
  }
}
</style>
