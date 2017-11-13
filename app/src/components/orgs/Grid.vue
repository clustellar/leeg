<template>
  <section>
    <b-field>
        <b-input v-model="filter" placeholder="Search..." type="search" icon="search"></b-input>
    </b-field>
    <div class="columns">
      <div class="column is-mobile">
        <article v-for="org in filteredOrgs" :key="org.name" class="media">
          <figure class="media-left">
            <p class="image is-256x256">
              <router-link :to="'/orgs/' + org.name">
                <img :src="org.logo || 'https://bulma.io/images/placeholders/256x256.png'">
              </router-link>
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <router-link :to="'/orgs/' + org.name">
                  <strong>{{ org.name }}</strong>
                </router-link>
                <small>{{ org.owner }}</small>
                <small>{{ org.members }}</small>
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
              <p>{{ org.description }}</p>
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
  import { OrgTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'

  export default {
    name: 'OrganizationsGrid',
    data () {
      return {
        filter: ''
      }
    },
    computed: {
      ...mapGetters({
        orgs: OrgTypes.all
      }),
      filteredOrgs () {
        return this.orgs.filter((org) => [org.name, org.description || ''].join(' ').match(this.filter))
      }
    },
    methods: {
      gridClass (org) {
        return 'tile'
      }
    },
    beforeCreate () {
      this.$store.dispatch(OrgTypes.filter, this.$route.params || {})
    }
  }
</script>
