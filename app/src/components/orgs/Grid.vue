<template>
  <section>
    <b-field>
        <b-input placeholder="Search..."
            type="search"
            icon="search">
        </b-input>
    </b-field>
    <div class="tile is-ancestor">
      <div v-for="org in orgs" class="title is-parent">
        <article :class="gridClass(org)">
          <div class="content">
            <p class="title" :text="org.title || org.name"></p>
            <img v-if="org.logo" :src="org.logo">
            <p v-if="org.description" class="subtitle" :text="org.description"></p>
          </div>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">One</p>
          <p class="subtitle">Subtitle</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child notification is-success">
          <div class="content">
            <p class="title">Tall tile</p>
            <p class="subtitle">With even more content</p>
            <div class="content">
              <!-- Content -->
            </div>
          </div>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">One</p>
          <p class="subtitle">Subtitle</p>
        </article>
      </div>
      <div class="tile is-parent is-vertical">
        <article class="tile is-child notification is-primary">
          <p class="title">Vertical...</p>
          <p class="subtitle">Top tile</p>
        </article>
        <article class="tile is-child notification is-warning">
          <p class="title">...tiles</p>
          <p class="subtitle">Bottom tile</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
  import { OrgTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'

  export default {
    name: 'OrganizationsGrid',
    data () {
      return {}
    },
    computed: {
      ...mapGetters({
        orgs: OrgTypes.all
      })
    },
    beforeCreate () {
      this.$store.dispatch(OrgTypes.fetch)
    }
  }
</script>
