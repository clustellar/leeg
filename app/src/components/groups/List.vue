<template>
  <section class="section">
    <div class="columns">
      <div class="column is-three-quarters">
        <h3>Groups Hosted on the Leeg</h3>
      </div>
      <div class="column is-one-quarter">
        <router-link to='/groups/new'>
          <button class="button is-primary">Start your own group</button>
        </router-link>
      </div>
    </div>
    <group-table></group-table>
  </section>
</template>

<script>
  import GroupTable from '@/components/groups/Table'

  export default {
    name: 'GroupListPage',
    data () {
      return {}
    },
    components: {
      GroupTable
    }
  }
</script>
