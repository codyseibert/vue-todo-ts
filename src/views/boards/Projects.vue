<template lang="pug">
panel(
  title="Projects"
)
  create-project-modal(
    :display="isCreateModalDisplayed"
    @closed="isCreateModalDisplayed = false"
  )

  v-btn(
    slot="action"
    class="white"
    light
    medium
    absolute
    right
    middle
    fab
    @click.stop="isCreateModalDisplayed = true"
  )
    v-icon add

  .placeholder.mt-4(
    v-if="!hasProjects"
  )
    img(
      src="../../assets/arrow.png"
    )
    h2.instructions Create Project

  .project(
    v-for="project in projects"
    @click="selectProject(project)"
    :class="{selected: isSelectedProject(project)}"
  )
    v-layout
      v-flex(xs9) {{project.title}}
      v-flex(xs2).text-xs-center
        v-progress-circular(
          v-bind:value="percentCompleted(project)"
          color="green"
        )
      v-flex.text-xs-center(x1)
        v-icon(
          v-if="isSelectedProject(project)"
        ) keyboard_arrow_right
</template>

<script lang="ts">
import CreateProjectModal from './CreateProjectModal.vue';
import { Component, Vue } from 'vue-property-decorator';
import {
  isSelectedProject,
  getProjects,
  createProject,
  setSelectedProject,
} from '@/store/boards/boards';

@Component({
  components: {
    CreateProjectModal,
  },
})
export default class Projects extends Vue {
  private isCreateModalDisplayed: boolean = false;
  private title: string = '';

  private get isSelectedProject() {
    return isSelectedProject(this.$store);
  }

  private get projects() {
    return getProjects(this.$store);
  }

  private get hasProjects() {
    return this.projects.length;
  }

  private createProject = () =>
    createProject(this.$store, this.title)

  private selectProject = (project) =>
    setSelectedProject(this.$store, project)

  private percentCompleted(project) {
    return project.tasks.reduce(
      (sum, task) => sum + (task.completed ? 1 : 0)
      , 0,
    ) / project.tasks.length * 100;
  }

  private mounted() {
    if (this.projects.length) {
      this.selectProject(this.projects[0]);
    }
  }
}
</script>

<style scoped lang="sass-loader?indentedSyntax">
.project
  cursor: pointer
  padding-top: 10px
  padding-bottom: 10px
  padding-left: 0px
  font-size: 18px

.project:hover
  color: #cddc3a

.selected
  color: #4cae51

.instructions
  position: relative
  right: 14px
  top: 34px
  text-align: right

img
  float: right
  width: 100px
  position: relative
  top: -20px
  right: 10px

.placeholder
  min-height: 70px

</style>
