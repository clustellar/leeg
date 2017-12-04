<template>
  <section class='pad-20'>
    <h1>Sessions</h1>
    <b-table :data='sessions' :bordered='isBordered' :striped='isStriped' :narrowed='isNarrowed' :hoverable='isHoverable'></b-table>
  </section>
</template>

<script>
  import { SessionTypes } from '@/store/mutation-types'

  export default {
    name: 'SessionsTable',
    props: {
      type: Object,
      default () {
        return {}
      }
    },
    data () {
      return {
        filter: {},
        isBordered: true,
        isStriped: true,
        isNarrowed: true,
        isHoverable: true
      }
    },
    computed: {
      sessions () {
        return this.$store.getters[SessionTypes.filter](this.$route.params.name, this.filter) || []
      }
    },
    beforeCreate () {
      this.$store.dispatch(SessionTypes.filter, this.$route.params.name, this.filter)
    }
  }
</script>
