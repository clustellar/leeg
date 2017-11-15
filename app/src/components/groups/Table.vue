<template>
  <section>
    <pre>{{ groups }}</pre>
  </section>
</template>

<script>
  import { GroupTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'
  import capitalize from '@/mixins/capitalize'

  export default {
    name: 'GroupTable',
    mixins: [capitalize],
    data () {
      return {
        filter: ''
      }
    },
    computed: {
      ...mapGetters({
        groups: GroupTypes.all
      }),
      filteredGroups () {
        return this.groups.filter((group) => [group.name, group.description || ''].join(' ').match(this.filter))
      }
    },
    beforeCreate () {
      this.$store.dispatch(GroupTypes.filter, this.$route.params || {})
    }
  }
</script>
