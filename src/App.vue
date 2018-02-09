<template lang="pug">
#app
  v-app
    page-header

    v-content
      v-container(fluid)
        router-view

    page-footer
</template>

<script>
import PageHeader from '@/components/Header.vue'
import PageFooter from '@/components/Footer.vue'

export default {
  name: 'app',
  components: {
    PageHeader,
    PageFooter
  }
}
</script>

<style>
body {
  font-family: 'Quicksand', sans-serif
}

ul, li, p, h1, h2, h3, h4, h5, h6, .toolbar__title, .alert, a, .footer, .input-group__input, input {
  font-family: 'Quicksand', sans-serif;
  font-weight: normal;
}
</style>
