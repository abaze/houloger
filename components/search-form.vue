<template>
  <div class="search-form">
    <ul v-if="!mini">
      <li
        :class="{ active: showMenu == 'li-projet' }"
        @click="showMenu = 'li-projet'"
        ref="li-projet"
      >
        <label>Projet</label>
        <b-form-input
          id="_projet"
          size="sm"
          placeholder="Acheter ? louer ?"
          readonly
          disabled
          v-model="list_options.vente_location.selected.text"
        ></b-form-input>
        <div
          v-if="showMenu == 'li-projet'"
          class="popup-search popup-projet animate__animated animate__fadeInDown animate__faster"
        >
          <b-form-group v-slot="{ ariaDescribedby }">
            <b-form-radio-group
              class="w-100"
              id="btn-radios-3"
              v-model="list_options.vente_location.selected"
              :options="list_options.vente_location.options"
              value-field="data"
              text-field="data.text"
              :aria-describedby="ariaDescribedby"
              name="radio-btn-stacked"
              size="md"
            ></b-form-radio-group>
          </b-form-group>
        </div>
      </li>
      <li
        :class="{ active: showMenu == 'li-hab' }"
        @click="showMenu = 'li-hab'"
        ref="li-hab"
      >
        <label>Habitation</label>
        <b-form-input
          id="_habitation"
          size="sm"
          placeholder="Appartement, Maison, Autre ?"
          readonly
          disabled
          v-model="list_options.type_bien.selected.text"
        ></b-form-input>
        <div
          v-if="showMenu == 'li-hab'"
          class="popup-search popup-habitation animate__animated animate__fadeInDown animate__faster"
        >
          <b-form-group v-slot="{ ariaDescribedby }">
            <b-form-radio-group
              class="w-100"
              id="btn-radios-3"
              v-model="list_options.type_bien.selected"
              :options="list_options.type_bien.options"
              value-field="data"
              text-field="data.text"
              :aria-describedby="ariaDescribedby"
              name="radio-btn-stacked"
              size="md"
            ></b-form-radio-group>
          </b-form-group>
        </div>
      </li>
      <li
        :class="{ active: showMenu == 'li-ch' }"
        @click="showMenu = 'li-ch'"
        ref="li-ch"
      >
        <div>
          <label>Chambres</label>

          <b-form-input
            id="_chambres"
            size="sm"
            placeholder="Nombre de chambre minimum"
            readonly
            disabled
            v-model="list_options.chambres.selected.text"
          ></b-form-input>
        </div>

        <button
          v-if="list_selected"
          type="button"
          class="btn-search animate__animated animate__zoomIn"
          @click.stop="search"
        >
          <div class="zone-icon">
            <fa
              v-if="load_search"
              class="text-white"
              icon="circle-notch"
              spin
            />
            <fa v-else class="icon-search" :icon="['fa', 'search']" />
          </div>
        </button>

        <div
          v-if="showMenu == 'li-ch'"
          class="popup-search popup-chambre animate__animated animate__fadeInDown animate__faster"
        >
          <b-form-group v-slot="{ ariaDescribedby }">
            <b-form-radio-group
              class="w-100"
              id="btn-radios-3"
              v-model="list_options.chambres.selected"
              :options="list_options.chambres.options"
              value-field="data"
              text-field="data.value"
              :aria-describedby="ariaDescribedby"
              name="radio-btn-stacked"
              size="md"
            ></b-form-radio-group>
          </b-form-group>
        </div>
      </li>
    </ul>
    <!-- MINI FORM STATE -->
    <div
      v-else
      id="singleButtonSearch"
      class="text-center"
      @click="showMiniForm"
    >
      <span>Commencez votre recherche</span>
      <button type="button" class="btn-search">
        <div class="zone-icon">
          <fa class="icon-search" :icon="['fa', 'search']" />
        </div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      autocomplete: null,
      showMenu: null,
      mini: false,
      load_search: false,
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
  methods: {
    handleResize(event) {
      this.mini = window.innerWidth <= 576 ? true : false
    },
    showMiniForm() {
      this.$store.commit('SET_SHOW_SLIDE_FORM', true)
    },
    search() {
      let _this = this
      let page = this.list_selected.projet || 'achat'
      let params = new URLSearchParams(this.list_selected).toString()
      let url_result = `/${page}/?${params}`
      this.showMenu = null
      this.load_search = true
      setTimeout(function () {
        _this.load_search = false
        _this.$router.push({ path: url_result })
      }, 3000)
    },
  },
  computed: {
    deployForm() {
      return this.$store.state.showSlideForm
    },
  },
  watch: {
    // a chaque changement on cache les popup
    list_options: {
      handler: function (val, oldVal) {
        this.showMenu = null

        let options = {}
        this.list_options.vente_location.selected.value
          ? (options.vente_location =
              this.list_options.vente_location.selected.value)
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
  mounted() {
    window.addEventListener('resize', this.handleResize)

    this.handleResize()

    let _this = this
    if (this.mini) {
      this.$store.commit('SET_SHOW_SLIDE_FORM', false)
    }

    // un clic en dehors de la barre de recherche ferme les popups
    window.addEventListener('click', function (e) {
      if (document.querySelector('.search-form > ul')) {
        if (!document.querySelector('.search-form > ul').contains(e.target)) {
          _this.showMenu = null
        }
      }
    })
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/vars/_mixin.scss';
.search-form {
  position: relative;
  z-index: 10;
  ul {
    position: relative;
    display: flex;
    margin: 0 auto;
    max-width: 800px;
    border-radius: 40px;
    padding: 0;
    background: #fff;
    font-family: 'Roboto', sans-serif;
    justify-content: center;
    list-style: none;

    li {
      position: relative;
      flex: 1;
      padding: rem-calc(3) rem-calc(15);
      outline: none;
      cursor: pointer;

      * {
        cursor: pointer;
      }

      &:first-child {
        padding-left: 32px;
      }
      &:last-child {
        padding-right: 0px;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .popup-search {
          right: 0;
          left: auto;
        }
      }

      &.active {
        background-color: #fff;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        border-radius: 40px;
        &:hover {
          background-color: #fff;
        }
      }

      & + li {
        margin-left: rem-calc(5);
        border-left: 1px solid #f8f8f8;
      }
      &:not(.active):after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 40px;
        background-color: rgba(0, 0, 0, 0.03);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.1s ease-in;
      }
      &:hover {
        border-radius: 40px;
        border-color: transparent;
        &:after {
          transform: scaleX(1);
        }

        & + li {
          border-color: transparent;
        }
      }
      &:last-child {
        margin-right: 0;
      }

      label {
        font-weight: bolder;
        font-size: rem-calc(12);
        transform: translateY(rem-calc(5));
        margin-bottom: 0;
      }

      input {
        background: transparent;
        border: none;
        padding: 0;
        font-size: rem-calc(14);
        font-weight: 500;
        cursor: pointer;

        &:focus {
          border: none;
          box-shadow: none;
        }
      }

      @include placeholder {
        font-size: rem-calc(13);
        font-weight: 400;
      }

      input.form-control {
        &:disabled,
        [readonly] {
          background-color: transparent;
          opacity: 1;
        }
      }

      /* POPIN SEARCH */
      .popup-search {
        position: absolute;
        left: 0;
        bottom: calc(-100% - 25px);
        min-width: max-content;
        border-radius: 40px;
        background-color: #fff;
        padding: rem-calc(25);
        z-index: 10;
        .form-group {
          margin-bottom: 0;
          cursor: pointer;
        }
      }
    }
  }
  #singleButtonSearch {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 250px;
    margin: auto;
    background-color: #fff;
    font-size: 0.8rem;
    line-height: 1;
    border: 1px solid rgba(51, 23, 83, 0.2);
    border-radius: 3rem;
    padding: 0.1rem 0.1rem 0.1rem 0.7rem;
    cursor: pointer;
  }

  #overlayForm {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
  }
  .btn-search {
    display: inline-block;
    min-width: 40px;
    height: 40px;
    background: linear-gradient(
      to right,
      #ffcb47 0%,
      #ffbe1a 50%,
      #fab300 100%
    );
    appearance: none;
    border: none;
    font-size: 16px;
    line-height: 1;
    padding: 0;
    margin: 0;
    border-radius: 50%;
    text-align: center;
    outline: none;
    overflow: hidden;
    z-index: 10;
    .zone-icon {
      display: inline-flex;
      position: relative;
      align-items: center;
      justify-content: center;
      z-index: 1;
      .icon-search {
        color: #fff;
        padding: 0;
        margin: 0;
      }
    }
  }
}
</style>
<style lang="css">
.custom-control-label,
.custom-control-label::after {
  cursor: pointer;
}
</style>
