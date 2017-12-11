<template>
  <div class="pad-10">
    <div class="box">
      <strong>{{ leeg.name }} - {{ session.name }}</strong>
      {{ members }}
    </div>
  </div>
</template>

<script>
  import { SessionTypes, LeegTypes, MembershipTypes } from '@/store/mutation-types'

  export default {
    name: 'MembershipList',
    data () {
      return {}
    },
    computed: {
      session () {
        return this.$store.getters[SessionTypes.find](this.$route.params.sessionId) || {}
      },
      leeg () {
        return this.$store.getters[LeegTypes.find](this.$route.params.leegId) || {}
      },
      members () {
        return this.$store.getters[MembershipTypes.filter](this.$route.params.leegId, this.$route.params.sessionId) || []
      }
    }
  }
</script>
