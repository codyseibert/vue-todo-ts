<template lang="pug">
v-toolbar.elevation-1.header.white(
  app
  fixed
  light
)
  v-toolbar-title.mr-4 VUE-TODO

  v-toolbar-items
    v-btn(
      flat
      color="grey"
      to="/create-board"
    )
      v-icon fiber_new

  v-spacer

  v-toolbar-items
    v-btn(
      flat
      color="grey"
    )
      v-icon fa-youtube-play

    v-btn(
      flat
      color="grey"
      href="https://github.com/codyseibert/vue-todo"
      target="_blank"
    )
      v-icon fa-github
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
}
</script>

<style scoped lang="sass-loader?indentedSyntax">
.header
  z-index: 100
  font-family: 'Quicksand', sans-serif
</style>
