<template>
  <section class="pad-20">
    <div class="tile is-ancestor has-text-centered">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">Orgs</p>
          <p class="subtitle">{{ Math.floor(Math.random() * 300) }}</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">Leagues</p>
          <p class="subtitle">{{ Math.floor(Math.random() * 300) }}</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">Participants</p>
          <p class="subtitle">{{ Math.floor(Math.random() * 300) }}</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">Games</p>
          <p class="subtitle">{{ Math.floor(Math.random() * 300) }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'SiteStats',
    data () {
      return {}
    }
  }
</script>
