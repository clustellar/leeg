<template>
  <section>
    {{ groups }}
    <b-table :data="groups" :bordered='isBordered' :striped='isStriped' :narrowed='isNarrowed' :hoverable='isHoverable' detailed>
      <template slot-scope='props'>
        <b-table-column label='logo' width='64'>
          <figure class='image is-64x64'>
            <img :src='props.row.logo'>
          </figure>
        </b-table-column>
        <b-table-column label='Name'>
          {{ props.row.name }}
        </b-table-column>
        <b-table-column label='Description'>
          {{ props.row.description }}
        </b-table-column>
        <b-table-column label='Members'>
          {{ Math.floor(Math.random()*1000) }}
        </b-table-column>
        <b-table-column label='Created At'>
          {{ props.row.createdAt }}
        </b-table-column>
      </template>
      <template slot="detail" slot-scope="props">
        <group-members-table :group="props.row"></group-members-table>
      </template>
    </b-table>
  </section>
</template>

<script>
  import { GroupTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'
  import capitalize from '@/mixins/capitalize'
  import GroupMembersTable from '@/components/groups/MembersTable'

  export default {
    name: 'GroupTable',
    mixins: [capitalize],
    data () {
      return {
        filter: '',
        isBordered: true,
        isStriped: true,
        isNarrowed: true,
        isHoverable: true
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
    },
    components: {
      GroupMembersTable
    }
  }
</script>
