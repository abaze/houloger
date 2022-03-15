import Vue from 'vue'

Vue.filter('capitalize', (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1)
})

Vue.filter('truncate', (text, max) => {
  return text && text.length > max
    ? text.slice(0, max).split(' ').slice(0, -1).join(' ') + '...'
    : text
})
