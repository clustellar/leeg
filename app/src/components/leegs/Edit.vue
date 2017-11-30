<template>
  <div class="columns pad-20">
    <div class="column is-3">
      <aside class="menu">
        <p class="menu-label">
          General
        </p>
        <ul class="menu-list">
          <li><a class="is-active">Dashboard</a></li>
          <li><a>Customers</a></li>
        </ul>
        <p class="menu-label">
          Administration
        </p>
        <ul class="menu-list">
          <li><a>Team Settings</a></li>
          <li>
            <a>Manage Your Team</a>
            <ul>
              <li><a>Members</a></li>
              <li><a>Plugins</a></li>
              <li><a>Add a member</a></li>
            </ul>
          </li>
          <li><a>Invitations</a></li>
          <li><a>Cloud Storage Environment Settings</a></li>
          <li><a>Authentication</a></li>
        </ul>
        <p class="menu-label">
          Transactions
        </p>
        <ul class="menu-list">
          <li><a>Payments</a></li>
          <li><a>Transfers</a></li>
          <li><a>Balance</a></li>
        </ul>
      </aside>
    </div>
    <div class="column is-9">
      <hero-heading title='Create your own!' subtitle='Define exactly what you need.  Public, private, open, closed, professional, personal, online, class registration, whatever you need!'></hero-heading>
      <site-stats></site-stats>
      <leeg-form></leeg-form>
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
      return {}
    },
    components: {
      LeegForm,
      SiteStats,
      HeroHeading
    }
  }
</script>
