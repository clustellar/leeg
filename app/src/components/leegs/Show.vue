<template>
  <section class="pad-10">
    <div class="container">
      <div class="media">
        <div class="media-left">
          <img class='image is-256x256' :src="logo || 'https://bulma.io/images/placeholders/256x256.png'">
        </div>
        <div class="media-content">
          <div class="content">
            <nav class="navbar is-transparent">
              <div class="navbar-brand">
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
                      <router-link :to="'/leagues/' + leeg.id + '/edit'">
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
            <h1>
              <strong class="is-capitalized">{{ leeg.name }}</strong>
            </h1>
            <h4>
              <small>{{ leeg.description }}</small>
            </h4>
            <h1>
              <span class="tag is-success is-large">Active</span>
            </h1>
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
    <div class="pad-10">
      <session-table></session-table>
    </div>
  </section>
</template>

<script>
  import { LeegTypes } from '@/store/mutation-types'
  import SessionTable from '@/components/sessions/Table'

  export default {
    name: 'LeegShowPage',
    data () {
      return {}
    },
    computed: {
      leeg () {
        return this.$store.getters[LeegTypes.find](this.$route.params.leegId) || {}
      },
      logo () {
        return this.$store.getters[LeegTypes.logo](this.$route.params.leegId) || ''
      }
    },
    components: {
      SessionTable
    }
  }
</script>
