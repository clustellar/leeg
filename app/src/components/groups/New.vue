<template>
  <section>
    <nav class="level">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Groups</p>
          <p class="title">{{ Math.floor(Math.random() * 300) }}</p>
        </div>
      </div>
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
    <div class="tile is-parent">
      <article class="tile is-child notification is-warning">
        <p class="title">A Leeg Group</p>
        <p class="subtitle">What is an group in Leeg?</p>
        <div class="content">
          Leeg uses Role based access control (RBAC) to allow access to resources in Leeg using user groups.  Each resource specify a list of groups that can perform sensitive actions on that resource.
          Only users in a listed group may perform that action.
        </div>
      </article>
    </div>
    <group-form></group-form>
  </section>
</template>

<script>
  import GroupForm from '@/components/groups/Form'

  export default {
    name: 'GroupNewPage',
    data () {
      return {}
    },
    components: {
      GroupForm
    }
  }
</script>
