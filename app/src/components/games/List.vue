<template>
  <section class="pad-10">
    <p class="title">Games</p>
    <div class="media" v-for="game in games" :key="game.id">
      <div class="media-left"></div>
      <div class="media-content">
        <p class="title">{{ game.name }}</p>
        <p class="subtitle">{{ game.description }}</p>
      </div>
      <div class="media-right"></div>
    </div>
  </section>
</template>

<script>
  import { GameTypes } from '@/store/mutation-types'

  export default {
    name: 'GamesList',
    data () {
      return {}
    },
    computed: {
      games () {
        return this.$store.getters[GameTypes.filter](this.$route.params) || []
      }
    }
  }
</script>
