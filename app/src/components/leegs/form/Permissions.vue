<template>
  <section class='pad-10'>
    <table class="table is-transparent" width='100%'>
      <thead>
        <tr>
          <th width='25%'>Permissions</th>
          <th width='25%'>Min</th>
          <th></th>
          <th width='25%' class='has-text-right'>Max</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Teams allowed per league</td>
          <td colspan='3'>
            <vue-slider @callback='setMTPL' :value="[value.min_teams_per_league || 1, value.max_teams_per_league || 100]" v-bind="slider" ref='mtpl'></vue-slider>
          </td>
        </tr>
        <tr>
          <td>Players allowed per team</td>
          <td colspan='3'>
            <vue-slider @callback='setMPPT' :value="[value.min_players_per_team || 1, value.max_players_per_team || 100]" v-bind="slider" ref='mppt'></vue-slider>
          </td>
        </tr>
        <tr>
          <td>Teams allowed per game</td>
          <td colspan='3'>
            <vue-slider @callback='setMTPG' :value="[value.min_teams_per_game || 1, value.max_teams_per_game || 100]" v-bind="slider" ref='mtpg'></vue-slider>
          </td>
        </tr>
        <tr>
          <td>Allow teams to join league anytime</td>
          <td colspan='1'>
            <b-switch @input='setATJL' :value="value.allow_teams_to_join_anytime">{{ value.allow_teams_to_join_anytime ? 'Yes' : 'No' }}</b-switch>
          </td>
          <td class='is-small has-text-right' colspan='2'>
            If not allowed, teams cannot be added once the league has started.
          </td>
        </tr>
        <tr>
          <td>Allow players to join teams anytime</td>
          <td colspan='1'>
            <b-switch @input='setAPJA' :value="value.allow_players_to_join_anytime">{{ value.allow_players_to_join_anytime ? 'Yes' : 'No' }}</b-switch>
          </td>
          <td class='is-small has-text-right' colspan='2'>
            If no, players will need manager approval to switch teams or join the league after it has started.
          </td>
        </tr>
        <tr>
          <td>Allow teams to request their own game locations</td>
          <td colspan='1'>
            <b-switch @input='setATRL' :value="value.allow_teams_to_request_locations">{{ value.allow_teams_to_request_locations ? 'Yes' : 'No' }}</b-switch>
          </td>
          <td class='is-small has-text-right' colspan='2'>
            If so, teams can suggest locations where games can be held.
          </td>
        </tr>
        <tr>
          <td>Allow teams to request their own games</td>
          <td colspan='1'>
            <b-switch @input='setATRG' :value="value.allow_teams_to_request_games">{{ value.allow_teams_to_request_games ? 'Yes' : 'No' }}</b-switch>
          </td>
          <td class='is-small has-text-right' colspan='2'>
            If yes, teams can challenge or request their own games, otherwise the league manager must schedule games.
          </td>
        </tr>
        <tr>
          <td>Allow teams to approve their own games</td>
          <td colspan='1'>
            <b-switch @input='setATAG' :value="value.allow_teams_to_approve_games">{{ value.allow_teams_to_approve_games ? 'Yes' : 'No' }}</b-switch>
          </td>
          <td class='is-small has-text-right' colspan='2'>
            If so, teams can accept challenges or game requests from other teams, else the league manager must approve all game requests.
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
  import vueSlider from 'vue-slider-component'

  export default {
    name: 'LeegFormPermissions',
    props: {
      value: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        slider: {
          min: 1,
          max: 1000,
          interval: 1,
          tooltip: 'hover',
          processStyle: {
            backgroundColor: 'rgba(121, 87, 213, 0.9)'
          }
        }
      }
    },
    methods: {
      setMTPL (val) {
        this.$emit('input', { min_teams_per_league: val[0], max_teams_per_league: val[1] })
      },
      setMPPT (val) {
        this.$emit('input', { min_players_per_team: val[0], max_players_per_team: val[1] })
      },
      setMTPG (val) {
        this.$emit('input', { min_teams_per_game: val[0], max_teams_per_game: val[1] })
      },
      setATJL (val) {
        this.$emit('input', { allow_teams_to_join_anytime: val })
      },
      setAPJA (val) {
        this.$emit('input', { allow_players_to_join_anytime: val })
      },
      setATRL (val) {
        this.$emit('input', { allow_teams_to_request_locations: val })
      },
      setATRG (val) {
        this.$emit('input', { allow_teams_to_request_games: val })
      },
      setATAG (val) {
        this.$emit('input', { allow_teams_to_approve_games: val })
      }
    },
    mounted () {
      this.$refs.mtpl.refresh()
      this.$refs.mppt.refresh()
      this.$refs.mtpg.refresh()
    },
    components: {
      vueSlider
    }
  }
</script>

<style @scoped='true'>
  td.is-small {
    font-size:80%;
    font-style:italic;
  }
</style>
