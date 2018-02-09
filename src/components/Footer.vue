<template lang="pug">
v-footer.pa-3(
  app
)
  router-link(
    to="/privacy"
  ) Privacy Policy
  v-spacer
  div Cody Seibert © {{ new Date().getFullYear() }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {
}
</script>

<style scoped>
</style>
