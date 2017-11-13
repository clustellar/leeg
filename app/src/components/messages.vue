<template>
  <div class="container">
  </div>
</template>

<script>
  import { MessageTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Messages',
    data () {
      return {}
    },
    computed: {
      ...mapGetters({
        messages: MessageTypes.all
      })
    },
    mounted () {
      this.$store.dispatch(MessageTypes.fetch)
    }
  }
</script>
