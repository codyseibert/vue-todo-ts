<template lang="pug">
panel(
  :title="selectedProject.title"
  v-if="selectedProject"
)
  edit-project-modal(
    :display="isEditModalDisplayed"
    @closed="isEditModalDisplayed = false"
  )

  v-speed-dial(
    slot="action"
    v-model='fab'
    direction='left'
    light
    absolute
    right
    medium
  )
    v-btn(
      slot='activator'
      color='white'
      light
      fab
      v-model='fab'
    )
      v-icon more_vert
      v-icon close
    v-btn(fab
      dark
      small
      color='red'
      @click="deleteProject"
    )
      v-icon delete
    v-btn(fab
      light
      small
      color='yellow'
      @click="isEditModalDisplayed = true"
    )
      v-icon edit

  v-layout(column)
    v-flex.pt-3(
      xs12
    )
      h2 {{getTotalCompleted}} / {{selectedProject.tasks.length}} Completed
      v-progress-linear(
        v-model="percentCompleted"
        buffer
        v-bind:buffer-value="100"
      )
</template>

<script lang="ts">
import EditProjectModal from './EditProjectModal.vue';
import { Component, Vue } from 'vue-property-decorator';
import {
  getSelectedProject,
  getProjects,
  deleteProject,
} from '@/store/boards/boards';

@Component({
  components: {
    EditProjectModal,
  },
})
export default class Info extends Vue {
  private fab: boolean = false;
  private isEditModalDisplayed: boolean = false;
  private title: string = '';

  private get selectedProject() {
    return getSelectedProject(this.$store);
  }

  private get projects() {
    return getProjects(this.$store);
  }
  private get getTotalCompleted() {
    return this.selectedProject.tasks.reduce(
      (sum, task) => sum + (task.completed ? 1 : 0)
      , 0,
    );
  }

  private get percentCompleted() {
    return this.selectedProject.tasks.reduce(
      (sum, task) => sum + (task.completed ? 1 : 0)
      , 0,
    ) / this.selectedProject.tasks.length * 100;
  }

  private deleteProject = () =>
    deleteProject(this.$store)
}
</script>

<style scoped lang="sass-loader?indentedSyntax">
.no-pad-top
  padding-top: 0px

.speed-dial
  margin-right: 0px !important
</style>
