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
            <button @click='save' class="button is-success">Save</button>
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
          <p class="title">Start this session on</p>
          <b-field>
            <b-datepicker @input='setStart' placeholder="start date..." icon="calendar-o" :readonly="false"></b-datepicker>
            <b-timepicker @input='setStartTime' placeholder="start time..." icon="clock-o" :readonly="false" :disabled='!startAt' :increment-minutes='15'></b-timepicker>
          </b-field>
        </div>
      </div>
      <div class="column is-half">
        <div class="box">
          <p class="title">End this session on</p>
          <b-field>
            <b-datepicker @input='setEnd' placeholder="ending on..." icon="calendar-o" :readonly="false"></b-datepicker>
            <b-timepicker @input='setEndTime' placeholder="ending time..." icon="clock-o" :readonly="false" :disabled='!endAt' :increment-minutes='15'></b-timepicker>
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
        startAt: null,
        startHr: null,
        startMin: null,
        endAt: null,
        endHr: null,
        endMin: null
      }
    },
    methods: {
      save () {
        this.$emit('save')
      },
      setName (val) {
        this.$emit('input', { leegId: this.leeg.id, name: val })
      },
      setDescription (val) {
        this.$emit('input', { leegId: this.leeg.id, description: val })
      },
      setStart (val) {
        this.startAt = val
        this.$emit('input', { leegId: this.leeg.id, startAt: val })
      },
      setEnd (val) {
        this.endAt = val
        this.$emit('input', { leegId: this.leeg.id, endAt: val })
      },
      setStartTime (val) {
        this.startAt.setHours(val.getHours())
        this.startAt.setMinutes(val.getMinutes())
        this.$emit('input', { leegId: this.leeg.id, startAt: this.startAt })
      },
      setEndTime (val) {
        this.endAt.setHours(val.getHours())
        this.endAt.setMinutes(val.getMinutes())
        this.$emit('input', { leegId: this.leeg.id, endAt: this.endAt })
      }
    },
    computed: {
      leeg () {
        return this.$store.getters[LeegTypes.filter](this.$route.params.id) || {}
      },
      logo () {
        return this.$store.getters[LeegTypes.logo](this.$route.params.id) || ''
      }
    },
    beforeCreate () {
      this.$store.dispatch(LeegTypes.filter, this.$route.params || {})
      this.$store.dispatch(LeegTypes.logo, this.$route.params || {})
    }
  }
</script>
