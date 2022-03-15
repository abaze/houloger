<template>
  <div>
    <div class="galerie">
      <div
        class="img animate__animated animate"
        v-for="x in 5"
        :class="[
          !annonce.photos[x - 1] ? 'no-img' : '',
          'animate__fadeIn animate__delay-' + x + 's',
        ]"
        @click="open_galerie(x - 1)"
        :key="x"
      >
        <b-img
          v-if="annonce.photos[x - 1]"
          :src="annonce.photos[x - 1].medium_large"
          fluid-grow
        ></b-img>
        <fa v-else class="icon-no-img" :icon="['fa', 'camera']" />
      </div>
      <b-button
        v-if="annonce.photos.length > 5"
        class="btn-show-galerie"
        variant="btn-link"
        @click="open_galerie()"
      >
        <fa class="icon-no-img" :icon="['fa', 'th']" /> Voir toutes les photos
      </b-button>
    </div>
    <div
      v-if="show_galerie && annonce"
      class="full-galerie animate__animated animate__fadeInDown animate__faster"
    >
      <b-button
        variant="link"
        @click="close_galerie"
        style="color: #fff"
        class="close-btn"
      >
        <fa icon="times" style="font-size: 2rem" />
      </b-button>
      <div class="zone-carousel">
        <!-- prev button-->
        <b-button
          variant="link"
          @click.stop="slide_galerie('prev')"
          style="color: #fff"
          class="nav-carousel nav-left"
        >
          <div class="nav-icon">
            <fa icon="chevron-left" style="font-size: 2rem" />
          </div>
        </b-button>

        <b-carousel
          class="carousel-annonce"
          indicators
          ref="carouselAnnonce"
          fade
        >
          <!-- Text slides with image -->
          <b-carousel-slide
            v-for="(photo, index) in annonce.photos"
            :caption="photo.titre"
            :key="index"
          >
            <template #img>
              <b-img :src="photo.url" class="big-photo" />
            </template>
          </b-carousel-slide>
        </b-carousel>
        <b-button
          variant="link"
          @click="slide_galerie('next')"
          style="color: #fff"
          class="nav-carousel nav-right"
        >
          <div class="nav-icon">
            <fa icon="chevron-right" style="font-size: 2rem" />
          </div>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['annonce'],
  data() {
    return {
      show_galerie: false,
    }
  },
  watch: {
    show_galerie(val) {
      document.body.style.overflow = val ? 'hidden' : 'auto'
    },
  },
  methods: {
    open_galerie(slide = 0) {
      let _this = this
      this.show_galerie = true
      if (slide) {
        setTimeout(function () {
          _this.$refs.carouselAnnonce.setSlide(slide)
        }, 100)
      }
    },
    close_galerie() {
      let _this = this
      let galerie = document.querySelector('.full-galerie')
      galerie.classList.add('animate__fadeOutUp')
      setTimeout(function () {
        _this.show_galerie = false
        galerie.classList.remove('animate__fadeOutUp')
      }, 1000)
    },
    slide_galerie(move) {
      switch (typeof move) {
        case 'string':
          move == 'prev'
            ? this.$refs.carouselAnnonce.prev()
            : this.$refs.carouselAnnonce.next()
          break
        case 'number':
          this.$refs.carouselAnnonce.setSlide(move)
        default:
          this.$refs.carouselAnnonce.next()
          break
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/vars/_vars.scss';
@import '~/assets/scss/vars/_mixin.scss';
.galerie {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0.5rem;
  grid-template-areas:
    'big-photo big-photo photo2 photo3'
    'big-photo big-photo photo4 photo5';
  min-height: 300px;
  height: 50vh;
  max-height: 500px;

  @include screen-md {
    grid-template-areas:
      'big-photo big-photo big-photo big-photo'
      'photo2 photo3  photo4 photo5';
  }
  @include screen-xs {
    grid-template-areas:
      'big-photo big-photo photo2 photo2'
      'photo3 photo3  photo4 photo5';
  }

  .img {
    position: relative;
    border: 1 px solid #f3f3f3;
    width: 100%;
    height: 100%;
    overflow: hidden;
    place-items: stretch;
    &:hover:not(.no-img) {
      cursor: pointer;
      &:after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        animation: 0.2s ease-in forwards background_color;
      }
    }
    &:first-child {
      grid-area: big-photo;
      border-top-left-radius: 1rem;
      border-bottom-left-radius: 1rem;

      @include screen-md {
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 0;
        border-top-right-radius: 1rem;
      }
      @include screen-xs {
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 0;
        border-top-right-radius: 0;
      }
    }
    &:nth-child(2) {
      grid-area: photo2;
      @include screen-md {
        border-bottom-left-radius: 1rem;
      }
      @include screen-xs {
        border-top-right-radius: 1rem;
        border-bottom-left-radius: 0;
      }
    }
    &:nth-child(3) {
      grid-area: photo3;
      border-top-right-radius: 1rem;
      @include screen-md {
        border-top-right-radius: 0;
      }
      @include screen-xs {
        border-bottom-left-radius: 1rem;
      }
    }
    &:nth-child(4) {
      grid-area: photo4;
    }
    &:nth-child(5) {
      grid-area: photo5;
      border-bottom-right-radius: 1rem;
    }

    img {
      position: relative;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &.no-img {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      color: #fff;
      background: #f3f3f3;
    }
  }
  .btn-show-galerie {
    position: absolute;
    right: 24px;
    bottom: 20px;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.6);
    border-radius: 1rem;

    @include screen-md {
      left: 50%;
      right: inherit;
      bottom: 0.5em;
      transform: translateX(-50%);
    }
  }
}

.full-galerie {
  position: fixed;
  display: flex;
  align-items: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background: #fff;

  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1000;
    background-color: rgba(88, 42, 42, 0.1);
  }
  .zone-carousel {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;

    .carousel-annonce {
      flex: 1;
    }

    .nav-carousel {
      position: absolute;
      outline: none;
      margin: 0;
      flex: 1;
      z-index: 10;
      height: 100%;
      .nav-icon {
        position: relative;
        background-color: rgba(0, 0, 0, 0.1);
        padding: 1rem;
        border-radius: 10px;
      }
      &:focus {
        box-shadow: none;
      }
      &.nav-left {
        left: 0;
      }
      &.nav-right {
        right: 0;
      }
    }
  }

  .big-photo {
    position: fixed;
    display: block;
    width: 100%;
    height: 100%;
    margin: auto;
    object-fit: cover;
    object-position: center;
    z-index: 5;
  }
}
.carousel-control-prev-icon,
.carousel-control-next-icon {
  background-color: #000;
  padding: 2rem;
  border-radius: 2rem;
  background-size: 2rem;
}

@keyframes background_color {
  from {
    background-color: transparent;
  }
  to {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>
<style>
.carousel .carousel-caption {
  position: fixed;
  left: 0;
  bottom: 20px;
  right: 0;
}
.carousel .carousel-caption h3 {
  color: #fff;
  text-shadow: 0 0 5px rgba(0, 0, 0, 1), 0 0 10px rgba(0, 0, 0, 0.5);
}
@media (max-width: 991px) {
  .carousel .carousel-caption h3 {
    font-size: 1rem;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.8);
  }
}
</style>
