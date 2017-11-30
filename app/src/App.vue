<template>
  <div id="app">
    <b-loading :active="isSigningIn" :can-cancel="true"></b-loading>
    <navbar></navbar>
    <div class="container">
      <messages></messages>
      <router-view/>
    </div>
  </div>
</template>

<script>
  import 'bulma/css/bulma.css'
  import 'buefy/lib/buefy.css'
  import '@/assets/custom.css'
  import Messages from '@/components/messages'
  import Navbar from '@/components/Navbar'
  import Api from '@/api'
  import { GlobalTypes } from '@/store/mutation-types'

  export default {
    name: 'app',
    data () {
      return {
        isSigningIn: false
      }
    },
    mounted () {
      this.$store.dispatch(GlobalTypes.signIn)
      // Api.primus.on('user:me', (user) => this.$store.dispatch(GlobalTypes.currentUser, user))
      Api.primus.on('toast', (opts) => this.$toast.open(opts))
      Api.primus.on('snackbar', (opts) => this.$snackbar.open(opts))
      Api.primus.on('dialog:alert', (opts) => this.$dialog.alert(opts))
      Api.primus.on('dialog:confirm', (opts) => this.$dialog.confirm(opts))
      Api.primus.on('dialog:prompt', (opts) => this.$dialog.prompt(opts))
    },
    components: {
      Navbar,
      Messages
    }
  }
</script>
