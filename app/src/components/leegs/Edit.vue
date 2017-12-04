<template>
  <div class="columns pad-20">
    <div class="column is-3">
      <aside class="menu" ref='menu'>
        <p class="menu-label">
          General
        </p>
        <ul class="menu-list">
          <li><a href='' @click.prevent="setMenu">Dashboard</a></li>
          <li><a href='permissions' @click.prevent='setMenu'>Rules and Permissions</a></li>
        </ul>
        <p class="menu-label">
          Sessions
        </p>
        <ul class="menu-list">
          <li><a href='sessions' @click.prevent='setMenu'>
            Sessions
            <span class="tag is-pulled-right is-success">Current</span>
          </a></li>
          <li><a href='archive' @click.prevent='setMenu'>Archives</a></li>
        </ul>
        <p class="menu-label">
          Administration
        </p>
        <ul class="menu-list">
          <li><a href='org' @click.prevent='setMenu'>Organization</a></li>
          <li><a href='teams' @click.prevent="setMenu">Teams</a></li>
          <li><a href='coaches' @click.prevent='setMenu'>Coaches</a></li>
          <li><a href='players' @click.prevent='setMenu'>Players</a></li>
        </ul>
      </aside>
    </div>
    <div class="column is-9">
      <leeg-form :show='menu'></leeg-form>
    </div>
  </div>
</template>

<script>
  import LeegForm from '@/components/leegs/Form'
  import SiteStats from '@/components/SiteStats'
  import HeroHeading from '@/components/HeroHeading'

  export default {
    name: 'LeegEditPage',
    data () {
      return {
        menu: ''
      }
    },
    methods: {
      clearActive () {
        let childs = this.$refs.menu.getElementsByClassName('is-active')
        for (let i = 0; i < childs.length; i++) {
          childs.item(i).className = ''
        }
      },
      setMenu (e) {
        this.clearActive()
        e.target.className = 'is-active'
        this.menu = e.target.href.split('/').pop()
      }
    },
    components: {
      LeegForm,
      SiteStats,
      HeroHeading
    }
  }
</script>
