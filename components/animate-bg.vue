<template>
  <div id="zoneBG">
    <div class="clouds">
      <div class="cloud"></div>
      <div class="cloud"></div>
      <div class="cloud"></div>
      <div class="cloud"></div>
      <div class="cloud"></div>
    </div>
    <div class="houses linear-bg"></div>
    <div class="road linear-bg"></div>
    <div class="car linear-bg"></div>
    <div class="grass linear-bg"></div>
  </div>
</template>

<script>
export default {
  methods: {
    animeBg() {
      const gsap = this.$gsap
      let zoneAnimation = document.querySelector('#zoneBG')
      let clouds = zoneAnimation.querySelectorAll('.clouds > .cloud')
      let houses = zoneAnimation.querySelector('.houses')
      let road = zoneAnimation.querySelector('.road')
      let car = zoneAnimation.querySelector('.car')
      let grass = zoneAnimation.querySelector('.grass')
      let screenWidth = window.screen.width

      // animation nuages
      for (let cloud of clouds) {
        let xMax = cloud.offsetWidth
        gsap.fromTo(
          cloud,
          {
            left: screenWidth + gsap.utils.random(xMax, xMax + 100),
            top: gsap.utils.random(15, 30),
            scale: gsap.utils.random(0.3, 1.5),
            opacity: gsap.utils.random(0.4, 1),
          },
          {
            left: -xMax,
            duration: gsap.utils.random(20, 60),
            repeat: -1,
            ease: 'linear',
          }
        )
      }

      // animation maisons
      gsap.fromTo(
        houses,
        { x: 0 },
        {
          x: '-200px',
          duration: 2.5,
          repeat: -1,
          ease: 'linear',
        }
      )
      // animation route
      gsap.fromTo(
        road,
        { x: 0 },
        {
          x: '-80px',
          duration: 0.5,
          repeat: -1,
          ease: 'linear',
        }
      )
      // animation herbe
      gsap.fromTo(
        grass,
        { x: 0 },
        {
          x: '-144px',
          duration: 0.4,
          repeat: -1,
          ease: 'linear',
        }
      )
      // animation voiture
      gsap.to(car, {
        left: '25%',
        duration: 5,
        delay: 3,
      })
    },
  },
  mounted() {
    console.clear()
    this.animeBg()
  },
}
</script>

<style lang="scss" scoped>
#zoneBG {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  background-color: #2980b9;
  .clouds {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;

    .cloud {
      position: absolute;
      background-image: url(../static/img/bg_anime/cloud.svg);
      background-size: cover;
      width: 100px;
      height: 50px;
    }
  }

  .linear-bg {
    position: absolute;
    background-repeat: repeat-x;
    background-size: contain;
    background-position-x: 0;
    left: 0;
    right: 0;
    width: 200vw;
  }

  .houses {
    bottom: 122px;
    background-image: url(../static/img/bg_anime/house.png);
    height: 200px;
    z-index: 9;
  }

  .road {
    bottom: 50px;
    background-image: url(../static/img/bg_anime/road.svg);
    height: 80px;
  }

  .car {
    bottom: 60px;
    left: -110px;
    transform: translateX(-50%);
    background-image: url(../static/img/bg_anime/car.svg);
    background-size: cover;
    background-repeat: no-repeat;
    width: 110px;
    height: 110px;
    z-index: 10;
  }

  .grass {
    bottom: 35px;
    background-image: url(../static/img/bg_anime/grass.svg);
    height: 125px;
  }
}

@keyframes cloud {
  0% {
    right: -100px;
  }
  100% {
    right: 100%;
  }
}

@keyframes loopBg {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: -100%;
  }
}

@keyframes moveCar {
  0% {
    transform: translate(3px, 0);
  }
  50% {
    transform: translate(5px, 1px);
  }
  100% {
    transform: translate(0, 0px);
  }
}
</style>
