<template>
  <div class="container">
    <h1>Messages:</h1>
  </div>
</template>

<script>
  import { app } from '@/services'

  export default {
    name: 'Messages',
    data () {
      return {}
    },
    mounted () {
      app.io.on('toast', opts => this.$toast.open(opts))
      app.io.on('alert', opts => this.$dialog.alert(opts))
      app.io.on('confirm', opts => this.$dialog.confirm(opts))
      app.io.on('prompt', opts => this.$dialog.prompt(opts))
      app.io.on('snackbar', opts => this.$snackbar.open(opts))
    }
  }
</script>
