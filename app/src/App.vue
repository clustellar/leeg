<template>
  <div id="app">
    <b-loading :active="isSigningIn" :can-cancel="true"></b-loading>
    <router-view/>
    <messages></messages>
  </div>
</template>

<script>
  import 'bulma/css/bulma.css'
  import 'buefy/lib/buefy.css'
  import Messages from '@/components/messages'

  export default {
    name: 'app',
    data () {
      return {
        isSigningIn: true
      }
    },
    components: {
      Messages
    }
  }
</script>
