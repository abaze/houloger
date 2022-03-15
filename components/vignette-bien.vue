<template>
  <div>
    <div class="vignette-bien">
      <nuxt-link :to="'/detail/' + annonce.id">
        <ul @mouseover="overVignette = true" @mouseleave="overVignette = false">
          <li>
            <div v-if="overVignette" class="overVignette">
              <fa
                title="Voir le détail"
                :icon="['fa', 'search']"
                class="animate__animated animate__zoomIn animate__faster"
              />
            </div>
            <b-img :src="annonce.photos[0].medium_large" fluid></b-img>
          </li>
          <li>
            <span>{{ annonce.type_du_bien | capitalize }}</span>
            <span
              >{{ annonce.lieu.ville.toUpperCase() }} ({{
                annonce.lieu.code_postal
              }})</span
            >
          </li>
          <li>
            <span>
              <fa
                class="mr-1"
                title="Surface habitable"
                :icon="['fa', 'ruler-combined']"
              />
              {{ annonce.surface_habitable }}&nbsp;m²
            </span>
            <span>
              <fa
                class="mr-1"
                title="Nombre de chambre"
                :icon="['fa', 'bed']"
              />
              {{ annonce.chambres }}
            </span>
          </li>
          <li>
            <p v-html="short_description"></p>
          </li>
          <li>
            {{
              annonce.prix
                ? parseInt(annonce.prix).toLocaleString() + ' €'
                : parseInt(annonce.loyer).toLocaleString() + ' €/mois'
            }}
          </li>
        </ul>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props: ['annonce'],
  data() {
    return {
      overVignette: false,
    }
  },

  computed: {
    title() {
      return `${this.annonce.type_du_bien.toUpperCase()} ${
        this.annonce.surface_habitable
      } m² ${this.annonce.lieu.ville.toUpperCase()} (${
        this.annonce.lieu.code_postal
      })`
    },
    short_description() {
      let short_desc = Vue.filter('truncate')(this.annonce.description, 120)
      return short_desc
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/vars/_vars.scss';
@import '~/assets/scss/vars/_mixin.scss';
.vignette-bien {
  justify-self: center;
  height: 100%;
  width: 100%;
  a {
    position: relative;
    display: block;
    color: inherit;
    text-decoration: none;
    z-index: 1;

    &:hover:after {
      position: absolute;
      content: '';
      top: -5px;
      left: -5px;
      z-index: -1;
      width: calc(100% + 10px);
      height: calc(100% + 10px);
      border-radius: 16px;
      opacity: 0;
      background: linear-gradient(
        155deg,
        rgba(218, 218, 217, 1) 0%,
        rgba(255, 255, 255, 1) 51%,
        rgba(218, 218, 217, 1) 100%
      );
      background-size: 100% 150%;
      background-position: 0 50%;
      animation: moveGradient 1.5s cubic-bezier(0.075, 0.82, 0.165, 1) forwards
        0.1s;
    }

    ul {
      height: 100%;
      padding: 0;
      margin: 0;
      list-style: none;
      border-radius: 16px;
      li {
        margin-bottom: 0.8em;
        padding: 0 0.4rem;
        &:first-child {
          position: relative;
          overflow: hidden;
          height: 262px;
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
          background-color: #f0f0f0;
          padding: 0;
          .overVignette {
            position: absolute;
            z-index: 0;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.3);
            font-size: 3rem;
            color: #fff;
            font-weight: 700;
          }
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        &:nth-child(2) {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 500;
        }
        &:nth-child(3) {
          display: flex;
          span {
            margin-right: 15px;
            font-size: 14px;
          }
        }
        &:nth-child(4) {
          overflow: hidden;
          height: 70px;
          @include screen-md {
            height: auto;
          }
          p {
            margin-bottom: 0;
            font-size: 0.9rem;
          }
        }
        &:last-child {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          text-align: center;
          font-size: 35px;
          font-weight: 700;
          color: $link_color;
        }
      }
    }
  }
}
@keyframes moveGradient {
  to {
    background-position: 5% 2%;
    opacity: 1;
  }
}
</style>
