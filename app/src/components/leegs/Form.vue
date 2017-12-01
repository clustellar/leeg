<template>
  <section class='section'>
    <b-loading :active.sync="loading" :canCancel="true"></b-loading>
    <div v-show="show === ''" class="columns">
      <modal-image-editor v-if="editingLogo" v-model="form.logo" :active="editingLogo" :onCancel='() => editingLogo = false'></modal-image-editor>
      
      <div class="column">
        <article class="media">
          <figure class="media-left overlay-container" @mouseover='clickToEdit = true' @mouseout='clickToEdit = false'>
            <div :class="clickToEdit ? 'notification is-primary' : 'notification'" style='padding:1px;'>
              <div class='img-placeholder'>
                <img class='image is-256x256 overlay-image' :src="form.logo || 'https://bulma.io/images/placeholders/256x256.png'">
                <div class="overlay-middle">
                  <button @click='editingLogo = true' class="button is-primary is-large overlay-text">Edit Logo</button>
                </div>
              </div>
            </div>
          </figure>
          <div class="media-content">
            <div class="columns">
              <div class="column">
                <b-field :type="nameInputType" :message='nameInputMessage' label="">
                  <b-input @keyup.native="validateName" v-model="form.name" placeholder='League Name' required></b-input>
                </b-field>
              </div>
              <div class="column">
                <b-field label="">
                  <b-input type='email' v-model="form.managerEmail" placeholder="Manager's Email" required></b-input>
                </b-field>
              </div>
            </div>
            <b-field>
              <b-input type='textarea' rows='5' v-model='form.description' placeholder='Description, Rules, or Information'></b-input>
            </b-field>
            <button @click='save' :disabled='!savable' class="button is-success">Save</button>
          </div>
        </article>
      </div>
    </div>
    
    <div v-show="show === 'permissions'" class="section">
      <table class="table" width='100%'>
        <thead>
          <tr>
            <th width='25%'>Permissions</th>
            <th width='25%'>Min</th>
            <th width='25%'></th>
            <th width='25%' class='has-text-right'>Max</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Teams allowed per league</td>
            <td colspan='3'>
              <vue-slider :value="[form.min_teams_per_league, form.max_teams_per_league]" v-bind="slider"></vue-slider>
            </td>
          </tr>
          <tr>
            <td>Players allowed per team</td>
            <td colspan='3'>
              <vue-slider :value="[form.min_players_per_team, form.max_players_per_team]" v-bind="slider"></vue-slider>
            </td>
          </tr>
          <tr>
            <td>Teams allowed per game</td>
            <td colspan='3'>
              <vue-slider :value="[form.min_teams_per_game, form.max_teams_per_game]" v-bind="slider"></vue-slider>
            </td>
          </tr>
          <tr>
            <td>Allow teams to join league anytime</td>
            <td colspan='1'>
              <b-switch v-model="form.allow_teams_to_join_anytime">{{ form.allow_teams_to_join_anytime ? 'Yes' : 'No' }}</b-switch>
            </td>
            <td class='has-text-right' colspan='2'>If not allowed, teams cannot be added once the league has started.</td>
          </tr>
          <tr>
            <td>Allow players to join teams anytime</td>
            <td colspan='1'>
              <b-switch v-model="form.allow_players_to_join_anytime">{{ form.allow_players_to_join_anytime ? 'Yes' : 'No' }}</b-switch>
            </td>
            <td class='has-text-right' colspan='2'>If no, players will need manager approval to switch teams or join the league after it has started.</td>
          </tr>
          <tr>
            <td>Allow teams to request their own game locations</td>
            <td colspan='1'>
              <b-switch v-model="form.allow_teams_to_request_locations">{{ form.allow_teams_to_request_locations ? 'Yes' : 'No' }}</b-switch>
            </td>
            <td class='has-text-right' colspan='2'>If so, teams can suggest locations where games can be held.</td>
          </tr>
          <tr>
            <td>Allow teams to request their own games</td>
            <td colspan='1'>
              <b-switch v-model="form.allow_teams_to_request_games">{{ form.allow_teams_to_request_games ? 'Yes' : 'No' }}</b-switch>
            </td>
            <td class='has-text-right' colspan='2'>If yes, teams can challenge or request their own games, otherwise the league manager must schedule games.</td>
          </tr>
          <tr>
            <td>Allow teams to approve their own games</td>
            <td colspan='1'>
              <b-switch v-model="form.allow_teams_to_approve_games">{{ form.allow_teams_to_approve_games ? 'Yes' : 'No' }}</b-switch>
            </td>
            <td class='has-text-right' colspan='2'>If so, teams can accept challenges or game requests from other teams, else the league manager must approve all game requests.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
  import { LeegTypes } from '@/store/mutation-types'
  import ModalImageEditor from '@/components/ModalImageEditor'
  import vueSlider from 'vue-slider-component'
  import api from '@/api'
  import debounce from 'debounce'

  export default {
    name: 'LeegForm',
    props: {
      show: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        clickToEdit: false,
        editingLogo: false,
        loading: false,
        loaded: false,
        nameInputType: '',
        nameInputMessage: '',
        form: {},
        slider: {
          min: 1,
          max: 100,
          interval: 1,
          tooltip: 'hover',
          processStyle: {
            backgroundColor: 'rgba(121, 87, 213, 0.9)'
          }
        }
      }
    },
    methods: {
      validateName: debounce(function (e) {
        let self = this
        if (e.target.value) {
          this.nameInputType = 'is-info'
          this.nameInputMessage = '<span class="fa fa-spinner fa-spin"></span> checking with server...'
          api.leeg.save(Object.assign({}, this.leeg, this.form), { params: { validate: true } }).then(function (resp) {
            console.log(resp)
            if (resp.valid) {
              self.nameInputType = 'is-success'
              self.nameInputMessage = resp.message
            } else {
              self.nameInputType = 'is-danger'
              self.nameInputMessage = resp.message
            }
          }).catch(function (err) {
            self.nameInputType = 'is-danger'
            self.nameInputMessage = err.toString()
          })
        } else {
          this.nameInputType = ''
          this.nameInputMessage = ''
        }
      }, 1000),
      save () {
        let self = this
        self.loading = true
        self.$toast.open({ type: 'is-info', message: 'saving leeg...' })
        self.$store.dispatch(LeegTypes.save, Object.assign({}, this.leeg, this.form)).then(resp => {
          self.loading = false
          self.$snackbar.open({ type: 'is-success', message: 'Saved ' + self.form.name + '!' })
        }).catch(err => {
          self.loading = false
          self.$dialog.alert({
            title: 'Error saving leeg!',
            message: err.toString(),
            type: 'is-danger',
            hasIcon: true,
            icon: 'times-circle',
            iconPack: 'fa'
          })
        })
      }
    },
    computed: {
      leeg () {
        return this.$store.getters[LeegTypes.filter](this.$route.params.name) || {}
      },
      privateInputMessage () {
        return this.form.private ? 'Only members will see the leeg listed.' : 'All users will see this leeg.'
      },
      savable () {
        return this.nameInputType === 'is-success' || this.loaded
      }
    },
    beforeCreate () {
      this.$store.dispatch(LeegTypes.filter, this.$route.params || {})
    },
    mounted () {
      if (!this.loaded) {
        this.form = Object.assign({}, this.leeg)
        this.loaded = true
      }
    },
    components: {
      ModalImageEditor,
      vueSlider
    }
  }
</script>

<style @scoped='true'>
  .img-placeholder {
    background-image:url(https://bulma.io/images/placeholders/256x256.png);
    background-size:256px 256px;
    background-repeat:no-repeat;
  }
  
  .overlay-container {
      position: relative;
      /*width: 50%;*/
  }
  
  .overlay-image {
    opacity: 1;
    display: block;
    /*width: 100%;*/
    /*height: auto;*/
    transition: .5s ease;
    backface-visibility: hidden;
  }
  
  .overlay-middle {
    transition: .5s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%)
  }
  
  .overlay-container:hover .overlay-image {
    opacity: 0.3;
  }
  
  .overlay-container:hover .overlay-middle {
    opacity: 1;
  }
  
  .overlay-text {
    /*background-color: #4CAF50;*/
    /*color: white;*/
    font-size: 16px;
    /*padding: 16px 32px;*/
  }
</style>
