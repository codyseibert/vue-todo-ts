<template lang="pug">
panel#privacy-policy(
  title="Privacy Policy"
) 
  p Before using this application, please acknowledge the following:
  
  ul
    li we do NOT request or store any personal information such as email, name, address, etc.
    li your todo list data is stored on a free-to-use third party service that we have no control over; therefore, assume that your stored data is not safe from others
    li your data can be access by anyone with the url to your todo list board; therefore, do not store anything personal or sensitive you would not want others to read
    li technically, someone could GUESS your URL even if you don't leak it
    li basically, don't use this application

  p Have a great day! 
  p - Dev Team @ VUE-TODO
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class PrivacyPolicy extends Vue {
}
</script>

<style scoped lang="sass-loader?indentedSyntax">
#privacy-policy
  /* font-family: 'Source Sans Pro', sans-serif; */
  /* font-family: 'Raleway', sans-serif; */
  /* font-family: 'Open Sans', sans-serif; */
  /* font-family: 'Quicksand', sans-serif; */

p
  font-size: 20px

li 
  font-size: 20px
  margin-bottom: 10px
  margin-left: 50px
</style>
