<template>
  <div>
    <menu-top @showMenu="showMenu"></menu-top>

    <main id="main_content">
      <b-container id="content_page" fluid class="min-vh-100">
        <Nuxt id="content_nuxt" />
        <b-overlay
          class="page-loader"
          :show="isReady"
          no-wrap
          fixed
          opacity="0.75"
          variant="white"
        />
      </b-container>

      <menu-overlay :show="show" @closeMenu="closeMenu"></menu-overlay>

      <b-overlay
        :show="showSlideForm"
        variant="white"
        opacity="1"
        z-index="100"
        fixed
        no-wrap
      >
        <template #overlay>
          <b-container fluid class="vh-100 vw-100">
            <b-row>
              <b-col class="d-flex justify-content-end">
                <b-button
                  variant="link"
                  @click="closeSlideForm"
                  style="color: #fff"
                  class="close-btn"
                >
                  <fa icon="times" style="font-size: 2rem" />
                </b-button>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <search-form-slide
                  class="animate__animated animate__bounceInRight"
                />
              </b-col>
            </b-row>
          </b-container>
        </template>
      </b-overlay>
    </main>
    <footer id="footer">
      <main-footer></main-footer>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    }
  },
  computed: {
    isReady() {
      return !this.$store.state.isReady
    },
    showSlideForm() {
      return this.$store.state.showSlideForm
    },
  },
  methods: {
    showMenu(show) {
      this.show = show
    },
    closeMenu(show) {
      this.show = show
    },
    closeSlideForm() {
      this.$store.commit('SET_SHOW_SLIDE_FORM', false)
    },
  },
  watch: {
    '$route.path': function () {
      this.showMenu(false)
    },
    show: function (val) {
      if (val) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'initial'
      }
    },
    showSlideForm: function (val) {
      if (val) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'initial'
      }
    },
  },
  mounted() {
    //custom page loading
    /*this.$nextTick(() => {
      this.$nuxt.$loading.start()

      setTimeout(() => this.$nuxt.$loading.finish(), 1000)
    })*/
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/vars/_mixin.scss';
#content_page {
  background-color: #fff;
  height: 100%;
}
.isLoading {
  display: none;
}

.close-btn {
  margin: 1rem 0;
  background-color: rgba(88, 42, 42, 0.3);
}
</style>
