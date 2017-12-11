<template>
  <section class='section'>
    <div class="columns">
      <div class="column is-12">
        <article class="media">
          <figure class="media-left">
            <div style='padding:1px;'>
              <div class='img-placeholder'>
                <img class='image is-256x256 overlay-image' :src="logo || 'https://bulma.io/images/placeholders/256x256.png'">
              </div>
            </div>
          </figure>
          <div class="media-content">
            <div class="columns">
              <div class="column">
                <b-field label="">
                  <b-input @input='setName' :value="value.name" placeholder='Session name' required></b-input>
                </b-field>
              </div>
            </div>
            <b-field>
              <b-input type='textarea' rows='5' @input='setDescription' :value='value.description' placeholder='Description, Rules, or Information'></b-input>
            </b-field>
            <button @click='save' :disabled='!savable' class="button is-success">Save</button>
          </div>
          <div class="media-right">
            <slot name='right'></slot>
          </div>
        </article>
      </div>
    </div>
    <div class="columns">
      <div class="column is-half">
        <div class="box">
          <p class="subtitle">Start this session on <strong v-if="startAt">{{ startAt.toDateString() }}</strong></p>
          <b-field>
            <b-datepicker @input='setStart' placeholder="start date..." icon="calendar-o" :readonly="false" :min-date="today" :max-date="nextyear"></b-datepicker>
            <b-timepicker @input='setStartTime' placeholder="start time..." icon="clock-o" :readonly="false" :disabled='!startAt' :increment-minutes='15'></b-timepicker>
          </b-field>
        </div>
      </div>
      <div class="column is-half">
        <div class="box">
          <p class="subtitle">End this session on <strong v-if="endAt">{{ endAt.toDateString() }}</strong></p>
          <b-field>
            <b-datepicker @input='setEnd' placeholder="ending on..." icon="calendar-o" :readonly="false" :min-date="startAt" :max-date="startAtPlusYear"></b-datepicker>
            <b-timepicker @input='setEndTime' :value='endAt' placeholder="ending time..." icon="clock-o" :readonly="false" :disabled='!endAt' :increment-minutes='15'></b-timepicker>
          </b-field>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { LeegTypes } from '@/store/mutation-types'

  export default {
    name: 'SessionForm',
    props: {
      value: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        name: '',
        startAt: null,
        startHr: null,
        startMin: null,
        endAt: null,
        endHr: null,
        endMin: null,
        today: new Date()
      }
    },
    methods: {
      save () {
        this.$emit('save')
      },
      setName (val) {
        this.name = val
        this.$emit('input', { leegId: this.leeg.id, name: val })
      },
      setDescription (val) {
        this.$emit('input', { leegId: this.leeg.id, description: val })
      },
      setStart (val) {
        if (val) {
          this.startAt = val
          this.startAt.setHours(this.startHr)
          this.startAt.setMinutes(this.startMin)
        } else {
          this.startAt = null
        }
        this.$emit('input', { leegId: this.leeg.id, startAt: this.startAt })
      },
      setEnd (val) {
        if (val) {
          this.endAt = val
          this.endAt.setHours(this.endHr)
          this.endAt.setMinutes(this.endMin)
        } else {
          this.endAt = null
        }
        this.$emit('input', { leegId: this.leeg.id, endAt: this.endAt })
      },
      setStartTime (val) {
        this.startHr = val.getHours()
        this.startMin = val.getMinutes()
        this.startAt.setHours(this.startHr)
        this.startAt.setMinutes(this.startMin)
        this.$emit('input', { leegId: this.leeg.id, startAt: this.startAt })
      },
      setEndTime (val) {
        this.endHr = val.getHours()
        this.endMin = val.getMinutes()
        this.endAt.setHours(this.endHr)
        this.endAt.setMinutes(this.endMin)
        this.$emit('input', { leegId: this.leeg.id, endAt: this.endAt })
      }
    },
    computed: {
      leeg () {
        return this.$store.getters[LeegTypes.filter](this.$route.params.leegId) || {}
      },
      logo () {
        return this.$store.getters[LeegTypes.logo](this.$route.params.leegId) || ''
      },
      savable () {
        return this.name.replace(/\s/g, '').length > 3 && this.startAt
      },
      nextyear () {
        let s = this.today
        let d = new Date(s)
        d.setFullYear(s.getFullYear() + 1)
        return d
      },
      startAtPlusYear () {
        let s = this.startAt || this.today
        let d = new Date(s)
        d.setFullYear(s.getFullYear() + 1)
        return d
      }
    },
    beforeCreate () {
      this.$store.dispatch(LeegTypes.filter, this.$route.params || {})
      this.$store.dispatch(LeegTypes.logo, this.$route.params || {})
    }
  }
</script>
