<template>
  <b-overlay
    class="overlay-menu"
    :show="show"
    no-wrap
    fixed
    opacity="0.95"
    variant="dark"
  >
    <template #overlay>
      <div
        class="min-vh-100 min-vw-100 text-center d-flex align-items-center justify-content-center"
      >
        <b-button
          variant="link"
          @click="close_menu"
          style="color: rgb(255, 190, 26)"
          class="animate__animated animate__zoomIn m-3 close-btn"
        >
          <fa icon="times" style="font-size: 3rem" />
        </b-button>
        <b-list-group>
          <b-list-group-item>
            <fa class="icon-facebook" :icon="['fab', 'facebook']" />
            <fa class="icon-twitter" :icon="['fab', 'twitter']" />
            <fa class="icon-instagram" :icon="['fab', 'instagram']" />
          </b-list-group-item>
          <b-list-group-item
            to="/"
            class="animate__animated animate__fadeInLeft animate__delay-1s"
            >Home</b-list-group-item
          >
          <b-list-group-item
            to="/achat"
            class="animate__animated animate__fadeInRight animate__delay-2s"
            >Acheter</b-list-group-item
          >
          <b-list-group-item
            to="/location"
            class="animate__animated animate__fadeInLeft animate__delay-3s"
            >Louer</b-list-group-item
          >
        </b-list-group>
      </div>
    </template>
  </b-overlay>
</template>

<script>
export default {
  props: ['show'],
  methods: {
    close_menu() {
      this.$emit('closeMenu', false)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/vars/_vars.scss';
@import '~/assets/scss/vars/_mixin.scss';

.overlay-menu {
  z-index: 10000 !important;
}
.overlay-menu .close-btn {
  position: absolute;
  top: 0px;
  right: 10px;
  z-index: 10;
}
.overlay-menu .list-group-item {
  font-size: 5rem;
  border: none;
  background-color: transparent;
  color: #fff;
  @include screen-md {
    font-size: 3rem;
  }
  @include screen-md {
    font-size: 2rem;
  }
}
.overlay-menu a.list-group-item {
  width: auto;
  transition: all 0.1s linear;
  position: relative;
}
.overlay-menu a.list-group-item.nuxt-link-exact-active {
  color: $text_color;
  font-weight: bold;
  pointer-events: none;
}
.overlay-menu a.list-group-item:hover {
  color: rgb(255, 190, 26);
}
.overlay-menu a.list-group-item:hover:after {
  content: '';
  position: absolute;
  bottom: 0px;
  left: 50%;
  width: 300px;
  border-bottom: 5px solid #ffbe1a;
  animation-duration: 0.3s;
  animation-name: underline_move;
  animation-fill-mode: forwards;
}

.icon-facebook {
  color: $color_facebook;
}
.icon-twitter {
  color: $color_twitter;
}
.icon-instagram {
  color: $color_instagram;
}
</style>
