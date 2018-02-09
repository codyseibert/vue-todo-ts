<template lang="pug">
panel.mt-4(
  title="Tasks"
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
    @click="createTask"
  )
    v-icon add
  .placeholder.mt-4(
    v-if="!tasks.length"
  )
    img(
      src="../../assets/arrow.png"
    )
    h2.instructions Create Task
  .pt-4(
    v-if="tasks.length"
  )
    draggable(
      v-model="tasks"
    )
      transition-group(
        name="fade"
      )
        .task(
          :key="task.id"
          v-for="(task, index) in tasks"
        )
          v-layout
            v-flex.pt20(xs1)
              v-icon.pointer drag_handle
            v-flex.pt20(xs1)
              v-icon.checkbox(
                @click="toggleTaskCompleted(task)"
              ) {{task.completed ? "check_box" : "check_box_outline_blank"}}
            v-flex(
              xs8
            )
              v-text-field(
                single-line
                autofocus
                label="I need to ..."
                :value="task.description"
                @input="(value) => { updateTaskDescription({task: task, description: value}) }"
                v-on:keydown.native.enter="blur"
              )
            v-flex.pt20.text-xs-center(
              xs2
            )
              v-icon.cancel(
                @click="deleteTask(task)"
              ) cancel
</template>

<script lang="ts">
import draggable from 'vuedraggable';
import { Component, Vue } from 'vue-property-decorator';
import {
  getSelectedProject,
  toggleTaskCompleted,
  updateTaskDescription,
  deleteTask,
  createTask,
  setProjectTasks,
} from '@/store/boards/boards';

@Component({
  components: {
    draggable,
  },
})
export default class Tasks extends Vue {
  private get tasks() {
    return [...getSelectedProject(this.$store).tasks].sort((x, y) =>
      (x.completed === y.completed) ? 0 : (x.completed) ? 1 : -1,
    );
  }

  private set tasks(tasks) {
    setProjectTasks(this.$store, tasks);
  }

  private toggleTaskCompleted = (task) =>
    toggleTaskCompleted(this.$store, task)

  private updateTaskDescription = (payload) =>
    updateTaskDescription(this.$store, payload)

  private deleteTask = (task) =>
    deleteTask(this.$store, task)

  private createTask = () =>
    createTask(this.$store)

  private setProjectTasks = (tasks) =>
    setProjectTasks(this.$store, tasks)

  private blur($event) {
    $event.target.blur();
  }
}
</script>

<style scoped lang="sass-loader?indentedSyntax">
.fade-enter-active
  transition: opacity 0.5s

.fade-leave-active
  transition: opacity 0.0s

.fade-enter, .fade-leave-to 
  opacity: 0

.checkbox
  cursor: pointer

.cancel
  cursor: pointer

.description
  cursor: pointer

.no-pad-top
  padding-top: 0px

.pointer
  cursor: pointer

.up
  top: -3px

.instructions
  position: relative
  right: 14px
  top: 36px
  text-align: right

img
  float: right
  width: 100px
  position: relative
  top: -20px
  right: 10px

.pt20
  padding-top: 20px
</style>
