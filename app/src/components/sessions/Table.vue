<template>
  <section>
    <h1 class="title">Current Sessions</h1>
    <b-table :data='sessions' :bordered='isBordered' :striped='isStriped' :narrowed='isNarrowed' :hoverable='isHoverable'>
      <template slot-scope='props'>
        </b-table-column>
        <b-table-column label='Name'>
          <router-link :to='sessionLink(props.row)'>
            {{ props.row.name }}
          </router-link>
        </b-table-column>
        <b-table-column label='Description'>
          {{ props.row.description }}
        </b-table-column>
        <b-table-column label='Starting Date'>
          {{ format(props.row.startAt) }}
        </b-table-column>
        <b-table-column label='Ending Date'>
          {{ format(props.row.endAt) }}
        </b-table-column>
      </template>
      <template slot="empty">
        <h3>There are currently no sessions in this League.</h3>
      </template>
    </b-table>
  </section>
</template>

<script>
  import { SessionTypes } from '@/store/mutation-types'
  import time from '@/mixins/time'

  export default {
    name: 'SessionsTable',
    props: {
      type: Object,
      default () {
        return {}
      }
    },
    data () {
      return {
        filter: {},
        isBordered: true,
        isStriped: true,
        isNarrowed: true,
        isHoverable: true
      }
    },
    methods: {
      sessionLink (session) {
        return ['/leagues', session.leegId, 'sessions', session.id].join('/').replace(/\/\//g, '/')
      }
    },
    computed: {
      sessions () {
        return this.$store.getters[SessionTypes.filter](this.$route.params.sessionId, this.filter) || []
      }
    },
    mixins: [time]
  }
</script>
