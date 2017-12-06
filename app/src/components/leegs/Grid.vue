<template>
  <section>
    <b-field>
        <b-input v-model="filter" placeholder="Search..." type="search" icon="search"></b-input>
    </b-field>
    <div class="columns">
      <div class="column is-mobile">
        <article v-for="leeg in filteredLeegs" :key="leeg.name" class="media">
          <figure class="media-left">
            <p class="image is-256x256">
              <router-link :to="'/leagues/' + leeg.name">
                <img :src="logos[leeg.name] || 'https://bulma.io/images/placeholders/256x256.png'">
              </router-link>
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <router-link :to="'/leagues/' + leeg.name">
                  <strong>{{ capitalize(leeg.name) }}</strong>
                </router-link>
                <small>{{ leeg.owner }}</small>
                <small>{{ leeg.members }}</small>
              </p>
            </div>
            <nav class="level">
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Leagues</p>
                  <p class="title">{{ Math.floor(Math.random() * 1000) }}</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Participants</p>
                  <p class="title">{{ Math.floor(Math.random() * 10000) }}</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Game or Events</p>
                  <p class="title">{{ Math.floor(Math.random() * 30000) }}</p>
                </div>
              </div>
            </nav>
            <div class="content">
              <p>{{ leeg.description }}</p>
            </div>
          </div>
          <div class="media-right">
            <b-icon icon="heart-o"></b-icon>
            <b-icon icon="twitter"></b-icon>
            <b-icon icon="facebook"></b-icon>
            <b-icon icon="google"></b-icon>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
  import { LeegTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'
  import capitalize from '@/mixins/capitalize'

  export default {
    name: 'LeegsGrid',
    mixins: [capitalize],
    data () {
      return {
        filter: ''
      }
    },
    computed: {
      ...mapGetters({
        leegs: LeegTypes.all,
        logos: LeegTypes.logos
      }),
      filteredLeegs () {
        return this.leegs.filter((leeg) => [leeg.name, leeg.description || ''].join(' ').match(this.filter))
      }
    },
    methods: {
      gridClass (leeg) {
        return 'tile'
      }
    },
    beforeCreate () {
      this.$store.dispatch(LeegTypes.filter, this.$route.params || {})
      this.$store.dispatch(LeegTypes.logo, this.$route.params || {})
    }
  }
</script>
