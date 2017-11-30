<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Welcome to the Leeg!</h1>
      <p class="subtitle">
        Join in or start your own!
      </p>
    </div>
    <leegs-list-page></leegs-list-page>
  </section>
</template>

<script>
  import LeegsListPage from '@/components/leegs/List'

  export default {
    name: 'HomePage',
    data () {
      return {}
    },
    components: {
      LeegsListPage
    }
  }
</script>
