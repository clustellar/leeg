<template>
  <section class="section">
    <div class="columns">
      <div class="column is-three-quarters">
        <h3>Leegs Hosted on the Leeg</h3>
      </div>
      <div class="column is-one-quarter">
        <router-link to='/leagues/new'>
          <button class="button is-primary">Start your own leeg</button>
        </router-link>
      </div>
    </div>
    <leegs-grid></leegs-grid>
  </section>
</template>

<script>
  import LeegsGrid from '@/components/leegs/Grid'

  export default {
    name: 'LeegListPage',
    data () {
      return {}
    },
    components: {
      LeegsGrid
    }
  }
</script>
