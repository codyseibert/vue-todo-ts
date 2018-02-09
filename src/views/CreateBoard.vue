<template lang="pug">
v-layout(row)
  v-flex.text-xs-center(xs12)
    h2.loading Creating Your Board
    v-progress-circular(
      indeterminate 
      v-bind:size="200" 
      color="primary"
    )
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { dispatchCreateBoard } from '@/store/boards/boards';

@Component
export default class CreateBoard extends Vue {
  private async mounted() {
    const boardToken = await dispatchCreateBoard(this.$store);
    setTimeout(() => {
      this.$router.push({name: 'Boards', params: {boardToken}});
    }, 1200);
  }
}
</script>

<style scoped lang="sass-loader?indentedSyntax">
.loading
  margin-top: 100px
  margin-bottom: 40px
</style>