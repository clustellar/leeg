<template>
  <div class="pad-20">
    <hero-heading title='Create your own!' subtitle='Define exactly what you need.  Public, private, open, closed, professional, personal, online, class registration, whatever you need!'></hero-heading>
    <site-stats></site-stats>
    <leeg-new-form></leeg-new-form>
  </div>
</template>

<script>
  import LeegNewForm from '@/components/leegs/NewForm'
  import SiteStats from '@/components/SiteStats'
  import HeroHeading from '@/components/HeroHeading'

  export default {
    name: 'LeegNewPage',
    data () {
      return {}
    },
    components: {
      LeegNewForm,
      SiteStats,
      HeroHeading
    }
  }
</script>
