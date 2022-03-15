<template>
  <div>
    <h2>Classe Energetique</h2>
    <div class="tab-dpe" v-if="valDPE">
      <div class="tab-row label label-1">Consomation énergetique</div>
      <div class="tab-row label label-2">Logement</div>
      <div class="tab-row arrow dpe-A">
        <span>
          <fa class="icon-facebook" :icon="['fa', 'less-than-equal']" />&nbsp;
          50
        </span>
        <span>A</span>
      </div>
      <div class="tab-row arrow dpe-B">
        <span> 51 à 90 </span>
        <span>B</span>
      </div>
      <div class="tab-row arrow dpe-C">
        <span> 91 à 150 </span>
        <span>C</span>
      </div>
      <div class="tab-row arrow dpe-D">
        <span>151 à 230</span>
        <span>D</span>
      </div>
      <div class="tab-row arrow dpe-E">
        <span>231 à 330</span>
        <span>E</span>
      </div>
      <div class="tab-row arrow dpe-F">
        <span>331 à 450</span>
        <span>F</span>
      </div>
      <div class="tab-row arrow dpe-G">
        <span
          ><fa
            class="icon-facebook"
            :icon="['fa', 'greater-than']"
          />&nbsp;450</span
        >
        <span>G</span>
      </div>
      <div class="tab-row label label-3">Logement énergivore</div>
      <div
        class="val-dpe animate__animated animate__fadeInDown"
        :class="'val-' + val_dpe"
      >
        {{ valDPE }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['valDPE'],
  computed: {
    val_dpe() {
      if (this.valDPE <= 50) {
        return 'A'
      } else if (this.valDPE >= 51 && this.valDPE <= 90) {
        return 'B'
      } else if (this.valDPE >= 91 && this.valDPE <= 150) {
        return 'C'
      } else if (this.valDPE >= 151 && this.valDPE <= 230) {
        return 'D'
      } else if (this.valDPE >= 231 && this.valDPE <= 330) {
        return 'E'
      } else if (this.valDPE >= 331 && this.valDPE <= 450) {
        return 'F'
      } else if (this.valDPE > 450) {
        return 'G'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.tab-dpe {
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
  .val-dpe {
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
      content: 'kWh EP/m².an';
      position: absolute;
      bottom: -15px;
      font-size: 0.5rem;
      width: 100%;
      letter-spacing: -0.6px;
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
  .dpe-A {
    grid-area: A;
    background-color: #00ff00;
  }
  .dpe-B {
    grid-area: B;
    background-color: #4dff00;
  }
  .dpe-C {
    grid-area: C;
    background-color: #b3ff00;
  }
  .dpe-D {
    grid-area: D;
    background-color: #ffff00;
  }
  .dpe-E {
    grid-area: E;
    background-color: #ffb300;
  }
  .dpe-F {
    grid-area: F;
    background-color: #ff4d00;
  }
  .dpe-G {
    grid-area: G;
    background-color: #ff0000;
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
