<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faArrowsAlt, faCheck, faTimes, faImage, faVolumeUp, faSearch, faEdit, faPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faCoffee, faArrowsAlt, faCheck, faTimes, faImage, faVolumeUp, faSearch, faEdit, faPlus, faArrowRight )
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false


export default Vue.extend({
  name: "flexCards-Prototype"
});
</script>

<style>
/* CSS */
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

body {
  font-family: "Source Sans Pro", sans-serif;
  background-color: #B9C9E3
}
#app{
  height: 98vh;
}
</style>
