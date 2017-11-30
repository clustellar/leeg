<template>
  <section class="hero is-info welcome is-small">
    <div class="hero-body">
      <div class="container is-fluid">
        <h1 class="title">{{ title }}</h1>
        <h2 class="subtitle">{{ subtitle }}</h2>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'HeroHeading',
    props: {
      title: {
        type: String,
        required: true
      },
      subtitle: {
        type: String,
        default: ''
      }
    },
    data () {
      return {}
    }
  }
</script>

<style>
  .welcome {
    background:linear-gradient(to right,#5B86E5,#36D1DC);
  }
</style>
