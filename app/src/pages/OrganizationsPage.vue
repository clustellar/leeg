<template>
  <section class="section">
    <div class="columns">
      <div class="column is-three-quarters">
        <h3>Organizations Hosted on the Leeg</h3>
      </div>
      <div class="column is-one-quarter">
        <router-link to='/orgs/new'>
          <button class="button is-primary">Start your own organization</button>
        </router-link>
      </div>
    </div>
    <organizations-grid></organizations-grid>
  </section>
</template>

<script>
  import OrganizationsGrid from '@/components/orgs/Grid'

  export default {
    name: 'OrganizationsPage',
    data () {
      return {}
    },
    components: {
      OrganizationsGrid
    }
  }
</script>
