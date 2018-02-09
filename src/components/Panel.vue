<template lang="pug">
.white.elevation-2
  v-toolbar(
    flat
    dense
    dark
    :class="color"
  )
    v-toolbar-title {{title}}
    slot(name="action")

  .pl-4.pr-4.pt-2.pb-2
    slot No slot content defined.
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Panel extends Vue {
  @Prop()
  private title: string;

  @Prop({default: 'green'})
  private color: string;
}
</script>

<style scoped>
</style>
