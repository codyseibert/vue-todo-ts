<template lang="pug">
v-layout(row)
  v-flex.text-xs-center(
    xs12
    v-if="loading"
  ) 
    h2.loading Loading Your Board
    v-progress-circular(
      indeterminate 
      v-bind:size="200" 
      color="primary"
    )

  transition(
    name="fade"
  )
    v-flex.mr-4(
      xs4
      v-if="!loading"
    )
      projects
      v-alert.mt-4(
        color="error" 
        outline
        icon="warning" 
        :value="true"
      ) your board will be deleted after 7 days of inactivity

  transition(
    name="fade"
  )
    v-flex(
      xs8
      v-if="!loading && selectedProject"
    )
      v-layout(
        column
      )
        info.mb-2
        tasks
</template>


<script lang="ts">
import Projects from './Projects.vue';
import Info from './Info.vue';
import Tasks from './Tasks.vue';
import { Component, Vue } from 'vue-property-decorator';
import {
  getSelectedProject,
  dispatchLoadBoard,
  dispatchSaveCurrentBoard,
} from '@/store/boards/boards';

@Component({
  components: {
    Projects,
    Info,
    Tasks,
  },
})
export default class Main extends Vue {
  private interval: NodeJS.Timer;
  private loading: boolean = true;

  private get selectedProject() {
    return getSelectedProject(this.$store);
  }

  private async mounted() {
    const boardToken = this.$store.state.route.params.boardToken;
    await dispatchLoadBoard(this.$store, boardToken);
    setTimeout(() => {
      this.loading = false;
    }, 400);
    this.interval = setInterval(() => {
      dispatchSaveCurrentBoard(this.$store, boardToken);
    }, 1000);
  }

  private destroyed() {
    clearInterval(this.interval);
  }
}
</script>

<style scoped lang="sass-loader?indentedSyntax">
.fade-enter-active, .fade-leave-active
  transition: opacity .5s

.fade-enter, .fade-leave-to
  opacity: 0

.loading
  margin-top: 100px
  margin-bottom: 40px
</style>
