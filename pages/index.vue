<template>
  <div id="mainHome">
    <b-row
      id="sectionHeader"
      class="section zone-header pt-5 justify-content-start flex-column"
    >
      <animate-bg></animate-bg>

      <b-col
        class="align-self-center"
        :class="{ 'pt-5 mt-5': $device.isMobile }"
      >
        <search-form />
      </b-col>

      <b-col :class="{ 'd-none': $device.isDesktop }">
        <h1
          class="animate__animated animate__fadeInDown animate__faster animate__delay-5s"
        >
          Trouvez le bien qu'il vous faut
        </h1>
      </b-col>
    </b-row>

    <b-row id="sectionAchat" class="section">
      <b-col class="visible-lazy text-center text-sm-left" md="6" offset-md="2">
        <h2 class="mb-5 text-center text-sm-left">Un projet d'achat ?</h2>
        <p class="mb-5 lh-15">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum,
          provident corrupti molestiae dolor nobis obcaecati quae vero? Facilis
          modi explicabo eum sapiente dolorem vitae quos corrupti dolor,
          distinctio, fuga consectetur.
        </p>
        <b-button
          :to="'/achat'"
          class="text-uppercase font-weight-bold"
          variant="warning"
          >Découvrez nos bien disponibles</b-button
        >
      </b-col>
    </b-row>
    <b-row id="sectionLocation" class="section">
      <b-col class="visible-lazy text-center text-sm-left" md="6" offset-md="2">
        <h2 class="mb-5 text-white text-center text-sm-left">
          Besoin d'une location ?
        </h2>
        <p class="mb-5 lh-15 text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum,
          provident corrupti molestiae dolor nobis obcaecati quae vero? Facilis
          modi explicabo eum sapiente dolorem vitae quos corrupti dolor,
          distinctio, fuga consectetur.
        </p>
        <b-button
          :to="'/location'"
          class="text-uppercase font-weight-bold"
          variant="light"
          >Découvrez nos bien disponibles</b-button
        >
      </b-col>
    </b-row>
    <b-row id="sectionContact" class="section text-center">
      <b-col offset-sm="3" sm="6">
        <h2>Nous contacter</h2>
        <b-row class="justify-content-center">
          <b-col lg="8">
            <p class="mx-auto mt-3 mb-3 text-white">
              Vous avez une question ?<br />
              Remplissez le formulaire
            </p>
          </b-col>
        </b-row>

        <b-form-row class="justify-content-center">
          <b-col class="mt-3" lg="6">
            <b-form-input
              id="input-2"
              placeholder="Nom"
              required
              class="mr-sm-2 mb-sm-0"
            ></b-form-input>
          </b-col>
          <b-col class="mt-3" lg="6">
            <b-form-input
              id="input-1"
              type="email"
              placeholder="Adresse email"
              required
              class="mr-sm-2 mb-sm-0"
            ></b-form-input>
          </b-col>
          <b-col class="mt-3" lg="12">
            <b-form-textarea
              id="textarea"
              trim
              placeholder="Votre question..."
            ></b-form-textarea>
          </b-col>
          <b-col class="mt-3">
            <b-button
              class="mt-3 mt-sm-0"
              block
              type="submit"
              variant="outline-light"
              >Envoyer</b-button
            >
          </b-col>
        </b-form-row>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import wave from '~/components/design/wave.vue'
export default {
  components: { wave },
  data() {
    return {
      scrollPage: 0,
      showEl: false,
      parallax: [],
    }
  },

  computed: {
    isPageReady() {
      return this.$store.state.isReady
    },
  },
  methods: {
    handleScroll(event) {
      let _this = this
      this.scrollPage = window.scrollY
    },
    init() {
      // init element show on scroll
      let options = {
        root: document.querySelector('#mainHome'),
        rootMargin: '0px',
        threshold: 0.8,
      }
      let observer = new IntersectionObserver(this.lazyShow, options)
      let elements = document.querySelectorAll('.visible-lazy')
      if (elements.length) {
        elements.forEach(function (el) {
          el.classList.add('not-visible-lazy')
          observer.observe(el)
        })
      }
    },
    lazyShow(entries, observer) {
      entries.forEach(function (entrie) {
        if (entrie.isIntersecting) {
          entrie.target.classList.remove('not-visible-lazy')
        } else {
          entrie.target.classList.add('not-visible-lazy')
        }
      })
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.init()

    this.$nextTick(() => {
      this.$store.commit('SET_PAGE_READY', true)
    })
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/animation.scss';
@import '~/assets/scss/vars/_vars.scss';
@import '~/assets/scss/vars/_mixin.scss';

html,
body {
  min-height: 100%;
  height: 100%;
}

#header {
  position: fixed;
  margin: 0 !important;
}

#mainHome {
  height: 100%;
}
.section {
  position: relative;
  height: 100%;
  min-height: 100vh;
  align-items: center;
  padding: 5rem 0;
  z-index: 1;
  overflow: hidden;

  &#sectionContact {
    background: #5671b4;
    color: #fff;

    h2 {
      color: #fff;
    }
  }

  @include screen-sm {
    background-position: center bottom !important;
  }
}
.parallax {
  overflow: hidden;
  @include screen-sm {
    background-attachment: initial !important;
  }
}
.zone-header {
  min-height: calc(100vh - 56px);
  opacity: 0;
  animation: 0.7s forwards entrance ease-in 1s;
  &:before {
    content: '';
    position: absolute;
    z-index: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0);
  }

  h1 {
    position: relative;
    display: inline-block;
    margin-left: 10%;
    color: #fff;
    font-weight: 700;
    z-index: 10;

    @include screen-md {
      font-size: 1.5rem;
    }
    @include screen-xs {
      margin-left: 0;
      font-size: 1.1rem;
    }

    &:after {
      content: '';
      position: absolute;
      right: 150%;
      bottom: -10px;
      width: 200%;
      height: 1px;
      border-bottom: 2px solid #fff;
      animation-delay: 1.7s;
      animation-duration: 0.7s;
      animation-fill-mode: forwards;
      animation-name: underline;
    }
  }
}

#sectionAchat {
  background-image: url(../static/img/bg-sale.jpg);
  background-size: cover;
  background-position: center bottom;
  background-repeat: no-repeat;
}

#sectionLocation {
  background-image: url(../static/img/background_sky.jpg);
  background-size: cover;
  background-position: center bottom;
  background-repeat: no-repeat;
}

h2 {
  font-size: 2.7rem;
  font-weight: 600;
  text-transform: uppercase;

  @include screen-md {
    font-size: 2rem;
  }
  @include screen-xs {
    font-size: 1.5rem;
  }
}

.service {
  position: relative;
  z-index: 0;
  width: 300px;
  height: 300px;
  clip-path: polygon(50% 0%, 100% 25%, 100% 100%, 0 100%, 0% 25%);

  &:nth-child(1) {
    transition-delay: 0.1s;
  }
  &:nth-child(2) {
    transition-delay: 0.2s;
  }
  &:nth-child(3) {
    transition-delay: 0.3s;
  }
  & + .service {
    margin-left: 3rem;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
    transition: all 0.2s ease-in;
  }

  @include screen-lg {
    width: 200px;
    height: 200px;
  }
  @include screen-sm {
    width: 100%;
    clip-path: none;

    & + .service {
      margin-left: 0;
      margin-top: 1rem;
    }

    img {
      filter: blur(0);
    }

    &:last-child {
      margin-bottom: 5rem;
    }
  }

  h3 {
    position: absolute;
    z-index: 10;
    right: 10px;
    bottom: 10px;
    font-size: 1.5rem;
    color: #fff;
    text-transform: uppercase;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  }
  &:hover {
    img {
      transform: scale(1.15);
    }
  }
}

.shine {
  box-shadow: 0 0 10px yellow, 0 0 20px yellow, 0 0 30px yellow, 0 0 40px yellow,
    0 0 50px yellow, 0 0 60px yellow, 0 0 70px yellow, 0 0 80px yellow,
    0 0 90px yellow, 0 0 100px yellow;
  width: 50px;
  height: 50px;
  background: #f3f3f3;
  border-radius: 50%;
  position: absolute;
  animation: moveCircle 500s forwards linear;
}
@keyframes moveCircle {
  0% {
    left: 3%;
    top: 0;
  }
  50% {
    left: 25%;
    top: 10%;
  }
  100% {
    left: 100%;
    transform: translateX(-100%);
    top: 15%;
  }
}
</style>
