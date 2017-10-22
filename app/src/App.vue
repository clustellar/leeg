<template>
  <div id="app">
    <b-loading :active="isSigningIn" :can-cancel="true"></b-loading>
    <navbar></navbar>
    <messages></messages>
    <router-view/>
  </div>
</template>

<script>
  import 'bulma/css/bulma.css'
  import 'buefy/lib/buefy.css'
  import Messages from '@/components/messages'
  import Navbar from '@/components/Navbar'

  export default {
    name: 'app',
    data () {
      return {
        isSigningIn: false
      }
    },
    components: {
      Navbar,
      Messages
    }
  }
</script>