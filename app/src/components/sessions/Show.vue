<template>
  <div class="pad-10">
    <hero-heading :title='session.name || ""' :subtitle='leeg.description || ""'></hero-heading>
    <div class="columns">
      <div class="column">
        <img :src='logo'>
      </div>
      <div class="column section">
        <div class="is-pulled-left">
          <button class="button is-primary is-large">Join Now!</button>
        </div>
      </div>
      <div class="column">
        <games-list></games-list>
      </div>
    </div>
  </div>
</template>

<script>
  import { SessionTypes, LeegTypes } from '@/store/mutation-types'
  import HeroHeading from '@/components/HeroHeading'
  import GamesList from '@/components/games/List'
  
  export default {
    name: 'SessionShowPage',
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
      logo () {
        return this.$store.getters[LeegTypes.logo](this.$route.params.leegId) || ''
      }
    },
    components: {
      HeroHeading,
      GamesList
    }
  }
</script>
