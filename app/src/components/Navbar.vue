<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <a class="navbar-item">
        <img :src="logo" alt="Leaguer">
      </a>
    </div>
    <div class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item">
          <router-link to="/">Leagues</router-link>
        </a>
        <a class="navbar-item">
          <router-link to="/leagues/new">Create League</router-link>
        </a>
      </div>
      <div v-if="currentUser" class="navbar-end">
        <b-dropdown v-model="navigation" position="is-bottom-left">
          <a class="navbar-item" slot="trigger">
            <img class="is-round" :src="currentUser.photo" />
            <b-icon icon="caret-down"></b-icon>
          </a>
          <b-dropdown-item custom>
            <b>{{ currentUser.displayName }}</b>
          </b-dropdown-item>
          <hr class="dropdown-divider">
          <b-dropdown-item>
            <a @click.stop.prevent>
              <b-icon icon="group"></b-icon>
              My Groups
            </a>
          </b-dropdown-item>
          <b-dropdown-item>
            <a @click.stop.prevent>
              <b-icon icon="calendar"></b-icon>
              My Calendar
            </a>
          </b-dropdown-item>
          <b-dropdown-item>
            <a @click.stop.prevent>
              <b-icon icon="globe"></b-icon>
              My Locations
            </a>
          </b-dropdown-item>
          <b-dropdown-item>
            <a @click.stop.prevent>
              <b-icon icon="gear"></b-icon>
              My Settings
            </a>
          </b-dropdown-item>
          <hr class="dropdown-divider">
          <b-dropdown-item>
            <a @click.stop.prevent="signout">
              <b-icon icon="sign-out"></b-icon>
              Sign Out
            </a>
          </b-dropdown-item>
        </b-dropdown>
      </div>
      <div v-show="!currentUser" class="navbar-end">
        <b-dropdown v-model="navigation" position="is-bottom-left">
          <a class="navbar-item" slot="trigger">
            <b-icon icon="sign-in"></b-icon>
            Sign in
          </a>
          <b-dropdown-item>
            <a :href='signInUrl'>Sign in with Google</a>
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
  </nav>
</template>

<script>
  import logo from '@/assets/LeagueIcon.png'
  import { GlobalTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        logo,
        navigation: 'home',
        signInUrl: process.env.API + '/auth/google'
      }
    },
    computed: {
      ...mapGetters({
        currentUser: GlobalTypes.currentUser
      })
    },
    methods: {
      signout () {
        this.$store.dispatch(GlobalTypes.signOut)
      }
    }
  }
</script>

<style scoped="true">
  .is-round {
    border-radius: 50%;
  }
</style>
