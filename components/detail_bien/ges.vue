<template>
  <div>
    <h2>Classe GES</h2>
    <div class="tab-ges" v-if="valGES">
      <div class="tab-row label label-1">Faible émission de GES</div>
      <div class="tab-row label label-2">Logement</div>
      <div class="tab-row arrow ges-A">
        <span>
          <fa class="icon-facebook" :icon="['fa', 'less-than-equal']" />&nbsp; 5
        </span>
        <span>A</span>
      </div>
      <div class="tab-row arrow ges-B">
        <span> 6 à 10 </span>
        <span>B</span>
      </div>
      <div class="tab-row arrow ges-C">
        <span> 11 à 20 </span>
        <span>C</span>
      </div>
      <div class="tab-row arrow ges-D">
        <span>21 à 35</span>
        <span>D</span>
      </div>
      <div class="tab-row arrow ges-E">
        <span>36 à 55</span>
        <span>E</span>
      </div>
      <div class="tab-row arrow ges-F">
        <span>56 à 80</span>
        <span>F</span>
      </div>
      <div class="tab-row arrow ges-G">
        <span
          ><fa
            class="icon-facebook"
            :icon="['fa', 'greater-than']"
          />&nbsp;80</span
        >
        <span>G</span>
      </div>
      <div class="tab-row label label-3">Forte émission de GES</div>
      <div
        class="val-ges animate__animated animate__fadeInDown"
        :class="'val-' + val_ges"
      >
        {{ valGES }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['valGES'],
  computed: {
    val_ges() {
      if (this.valGES <= 5) {
        return 'A'
      } else if (this.valGES >= 6 && this.valGES <= 10) {
        return 'B'
      } else if (this.valGES >= 11 && this.valGES <= 20) {
        return 'C'
      } else if (this.valGES >= 21 && this.valGES <= 35) {
        return 'D'
      } else if (this.valGES >= 36 && this.valGES <= 55) {
        return 'E'
      } else if (this.valGES >= 56 && this.valGES <= 80) {
        return 'F'
      } else if (this.valGES > 80) {
        return 'G'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.tab-ges {
  position: relative;
  display: grid;
  width: 100%;
  max-width: 300px;
  height: 300px;
  margin-bottom: 1em;
  grid-template-columns: 80px repeat(6, 1fr) 50px;
  grid-template-rows: repeat(9, 1fr);
  gap: 0.2rem;
  grid-template-areas:
    'label-1 label-1 label-1 label-1 label-1 . . label-2'
    'A . . . . . . val-A'
    'B B . . . . . val-B'
    'C C C . . . . val-C'
    'D D D D . . . val-D'
    'E E E E E . . val-E'
    'F F F F F F . val-F'
    'G G G G G G G val-G'
    'label-3 label-3 label-3 label-3 . . . .';

  .tab-row {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 0.6rem;
    font-size: 0.8rem;
    justify-content: space-between;
    z-index: 10;
    font-weight: bold;

    &.label {
      padding: 0;
      font-size: 0.7rem;
    }

    &.arrow {
      clip-path: polygon(0 0, 95% 0, 100% 50%, 95% 100%, 0 100%);
    }
  }
  .val-ges {
    position: relative;
    background-color: #0f0f0f;
    color: #f0f0f0;
    padding: 0;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    z-index: 0;
    &:before {
      content: '';
      position: absolute;
      bottom: 50%;
      right: 0;
      width: 290px;
      height: 1px;
      border-bottom: 1px dashed #0f0f0f;
      z-index: -1;
    }
    &:after {
      content: 'kg éqCO2/m².an';
      position: absolute;
      bottom: -15px;
      font-size: 0.5rem;
      width: 130%;
      letter-spacing: -0.1px;
      color: #0f0f0f;
    }
  }

  .label-1 {
    grid-area: label-1;
  }
  .label-2 {
    grid-area: label-2;
  }
  .label-3 {
    grid-area: label-3;
  }
  .ges-A {
    grid-area: A;
    background-color: #f6edfd;
  }
  .ges-B {
    grid-area: B;
    background-color: #e1c2f8;
  }
  .ges-C {
    grid-area: C;
    background-color: #d4a9f5;
  }
  .ges-D {
    grid-area: D;
    background-color: #cb95f3;
  }
  .ges-E {
    grid-area: E;
    background-color: #ba72ef;
  }
  .ges-F {
    grid-area: F;
    background-color: #a74deb;
  }
  .ges-G {
    grid-area: G;
    background-color: #8a19df;
  }
  .val-A {
    grid-area: val-A;
  }
  .val-B {
    grid-area: val-B;
  }
  .val-C {
    grid-area: val-C;
  }
  .val-D {
    grid-area: val-D;
  }
  .val-E {
    grid-area: val-E;
  }
  .val-F {
    grid-area: val-F;
  }
  .val-G {
    grid-area: val-G;
  }
}
</style>
