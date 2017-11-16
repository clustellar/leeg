<template>
  <section>
    <nav class="level">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Organizations</p>
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
      <article class="tile is-child notification is-info">
        <p class="title">A Leeg Organization</p>
        <p class="subtitle">What is an organization in Leeg?</p>
        <div class="content">
          An organization in Leeg is also known as a namespace and can also be thought of as the governing body for a collection of activities.
          If you want to run a Leeg activity but do not want the hassel of managing an entire organization,
          consider searching for an open organization to host it, or use the 'Public' organization, which is wholely unmanaged.
          <br><br>
          <router-link tag='span' to='/orgs/public/new'>
            <button class='button is-warning'>Start a Public activity</button>
          </router-link>
        </div>
      </article>
    </div>
    <organization-form></organization-form>
  </section>
</template>

<script>
  import OrganizationForm from '@/components/orgs/Form'

  export default {
    name: 'OrganizationNewPage',
    data () {
      return {}
    },
    components: {
      OrganizationForm
    }
  }
</script>
