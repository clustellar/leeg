<template>
  <div id="app">
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
    components: {
      Messages
    }
  }
</script>
