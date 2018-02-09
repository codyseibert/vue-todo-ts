<template lang="pug">
v-dialog(
  v-model="display"
  persistent
  max-width="290"
)
  v-card
    v-card-title
      h2 Edit Project Title
    v-card-text
      v-text-field(
        autofocus
        v-if="display"
        label="Title"
        v-model="title"
        v-on:keydown.native.enter="updateProjectTitle"
      )
      v-btn.text-xs-center(
        color="primary"
        @click="updateProjectTitle"
      ) Save
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {
  getSelectedProject,
  updateProjectTitle,
} from '@/store/boards/boards';

@Component
export default class EditProjectModal extends Vue {
  @Prop()
  private display: boolean;

  private dataTitle: string = '';

  private get selectedProject() {
    return getSelectedProject(this.$store);
  }

  private get title() {
    return this.selectedProject.title;
  }
  private set title(newTitle) {
    this.dataTitle = newTitle;
  }

  private updateProjectTitle() {
    updateProjectTitle(this.$store, this.dataTitle);
    this.$emit('closed');
  }
}
</script>

<style scoped lang="sass-loader?indentedSyntax">
</style>
