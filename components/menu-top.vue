<template>
  <header id="header">
    <b-navbar class="navbar nav-active" toggleable type="dark" variant="faded">
      <b-navbar-brand to="/">
        <div class="scene">
          <div v-if="isReady" class="cube">
            <div class="cube__face cube__face--front">
              <b-img src="/img/logo_actif.png" alt="Houloger.com"></b-img>
            </div>
            <div class="cube__face cube__face--top">
              <b-img src="/img/logo_actif.png" alt="Houloger.com"></b-img>
            </div>
            <div class="cube__face cube__face--back">
              <b-img src="/img/logo_actif.png" alt="Houloger.com"></b-img>
            </div>
            <div class="cube__face cube__face--bottom">
              <b-img src="/img/logo_actif.png" alt="Houloger.com"></b-img>
            </div>
          </div>
          <!--b-img
            src="/img/logo_actif.png"
            fluid
            alt="Houloger.com"
            width="130px"
            class="animate__animated animate__slideInLeft animate_faster"
          ></b-img-->
        </div>
      </b-navbar-brand>

      <b-navbar-toggle
        class="btn-toggle-nav"
        target="navbar-toggle-collapse"
        @click="showMenu"
      >
        <template #default="{ expanded }">
          <fa icon="bars" />
        </template>
      </b-navbar-toggle>
    </b-navbar>
  </header>
</template>

<script>
export default {
  data() {
    return {
      expanded: false,
      scrollPage: 0,
      isReady: false,
    }
  },
  methods: {
    showMenu() {
      this.$emit('showMenu', true)
    },
    handleScroll(event) {
      this.scrollPage = window.scrollY
    },
    showMiniForm() {},
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.isReady = true
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
    this.isReady = false
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/animation.scss';
@import '~/assets/scss/vars/_mixin.scss';
#header {
  position: relative;
  display: block;
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.08);
  margin: 0;
  z-index: 10;

  .navbar {
    &.nav-active {
      background-color: #fff;
      //box-shadow: 0 1px 12px rgba(0, 0, 0, 0.08);
    }

    .navbar-toggler {
      width: 40px;
      height: 40px;
      padding: 0;
      border: 1px solid rgba(0, 0, 0, 0.04);
      border-radius: 50%;
      outline: none;
      background: #fff;
      color: #000;
    }
  }
}
</style>
<style lang="css">
.scene {
  perspective: 200px;
}

.cube {
  width: 130px;
  height: 40px;
  position: relative;
  transform-style: preserve-3d;
  transform: scale(0, 0) translateZ(-100px);
  animation: logoAnimation 2s ease-in-out forwards;
}

.cube__face {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 130px;
  height: 40px;
  padding: 5px 10px;
  /*border: 1px solid rgba(215, 207, 207, 0.3);*/
  border-radius: 5px;
}

.cube__face--front {
  background: rgba(255, 255, 255, 1);
}
.cube__face--top {
  background: rgba(255, 255, 255, 1);
}
.cube__face--back {
  background: rgba(255, 255, 255, 1);
}
.cube__face--bottom {
  background: rgba(255, 255, 255, 1);
}

.cube__face--front {
  transform: rotateY(0deg) translateZ(20px);
}
.cube__face--top {
  transform: rotateX(90deg) translateZ(20px);
}
.cube__face--back {
  transform: rotateX(180deg) translateZ(20px);
}
.cube__face--bottom {
  transform: rotateX(270deg) translateZ(20px);
}
.cube.is-backface-hidden .cube__face {
  backface-visibility: hidden;
}

@keyframes logoAnimation {
  0% {
    transform: scale(0, 0) translateZ(-300px) rotateX(0deg);
  }

  70% {
    transform: scale(1, 1) translateZ(-150px) rotateX(180deg);
  }
  100% {
    transform: scale(1, 1) translateZ(0px) rotateX(360deg);
  }
}
</style>
