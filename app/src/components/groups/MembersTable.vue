<template>
  <section>
    <b-table :data='members' :bordered='isBordered' :striped='isStriped' :narrowed='isNarrowed' :hoverable='isHoverable'></b-table>
  </section>
</template>

<script>
  import { UserTypes } from '@/store/mutation-types'

  export default {
    name: 'GroupMembersTable',
    props: {
      group: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        members: [],
        isBordered: true,
        isStriped: true,
        isNarrowed: true,
        isHoverable: true
      }
    },
    mounted () {
      this.$store.dispatch(UserTypes.filter, { groupId: this.group.id })
    }
  }
</script>
