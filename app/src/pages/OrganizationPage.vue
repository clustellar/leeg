<template>
  <section class="hero is-light is-bold">
    <div class="hero-body">
      <div class="container">
        <nav class="level">
          <div class="level-item has-text-centered">
            <img :src="org.logo">
          </div>
          <div class="level-item has-text-centered">
            <h1 class="title">
              Organization {{ org.name }}
            </h1>
          </div>
          <div class="level-item has-text-centered">
            <h2 class="subtitle">
              {{ org.description }}
            </h2>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Likes</p>
              <p class="title">{{ Math.floor(Math.random() * 1000) }}</p>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </section>
</template>

<script>
  import { OrgTypes } from '@/store/mutation-types'
  // import { mapGetters } from 'vuex'

  export default {
    name: 'OrganizationPage',
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
