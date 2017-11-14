<template>
  <section>
    <nav class="navbar">
      <div class="navbar-brand">
        <a class="navbar-item is-paddingless">
          <img class="navbar-img is-round" :src="org.logo" :alt="org.name">
        </a>
        <a class="navbar-item has-text-info"><b-icon pack="fa" icon="github"></b-icon></a>
        <a class="navbar-item has-text-info"><b-icon pack="fa" icon="twitter"></b-icon></a>
      </div>

      <div class="navbar-menu">
        <div class="navbar-end">
          <b-dropdown position="is-bottom-left">
            <a class="navbar-item" slot="trigger">
              <b-icon icon="cog"></b-icon>
              <b-icon icon="caret-down"></b-icon>
            </a>
            <b-dropdown-item has-link>
              <router-link :to="'/orgs/' + org.name + '/edit'">
                <b-icon icon="pencil"></b-icon>
                Edit Settings
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item value="home">
              <b-icon icon="home"></b-icon>
              Home
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </nav>
    <section class="hero is-light is-bold">
      <div class="hero-body">
        <div class="container">
          <div class="media">
            <div class="media-left">
              <img :src="org.logo">
            </div>
            <div class="media-content">
              <div class="content">
                <h1>
                  <strong>Organization: {{ capitalize(org.name) }}</strong>
                </h1>
                <h4>
                  <small>{{ org.description }}</small>
                </h4>
              </div>
            </div>
            <div class="media-right has-text-centered">
              <div>
                <p class="heading">Likes</p>
                <p class="title">{{ Math.floor(Math.random() * 1000) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
  import { OrgTypes } from '@/store/mutation-types'
  import capitalize from '@/mixins/capitalize'

  export default {
    name: 'OrganizationPage',
    mixins: [capitalize],
    data () {
      return {}
    },
    computed: {
      org () {
        return this.$store.getters[OrgTypes.filter](this.$route.params.name) || {}
      }
    },
    beforeCreate () {
      this.$store.dispatch(OrgTypes.filter, this.$route.params || {})
    },
    components: {}
  }
</script>

<style scoped>
  img.is-round {
    border-radius: 50%;
  }
  .navbar-img {
    max-height:51px;
  }
</style>
