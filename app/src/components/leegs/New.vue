<template>
  <div class="pad-20">
    <hero-heading title='Create your own!' subtitle='Define exactly what you need.  Public, private, open, closed, professional, personal, online, class registration, whatever you need!'></hero-heading>
    <site-stats></site-stats>
    <leeg-form-form :value='form' :logo='form.logo' @input='changed' @save='save'>
      <template slot='right'>
        <strong>Which best fits your scenario?</strong>
        <ul class="pad-10">
          <li class="mar-5"><b-radio v-model="scenario" name='scenario' native-value="sport"> Managed Sports League</b-radio></li>
          <li class="mar-5"><b-radio v-model="scenario" name='scenario' native-value="class"> Class or Event Registration</b-radio></li>
          <li class="mar-5"><b-radio v-model="scenario" name='scenario' native-value="fun"> Social Hangout</b-radio></li>
          <li class="mar-5"><b-radio v-model="scenario" name='scenario' native-value="fun"> Friendly Competition</b-radio></li>
          <li class="mar-5"><b-radio v-model="scenario" name='scenario' native-value="fun"> Secret Society</b-radio></li>
        </ul>
        <p style='font-size:11px;'>
          This is only use to guess default settings,
          <br>you can always adjust them later.
        </p>
      </template>
    </leeg-form-form>
  </div>
</template>

<script>
  import SiteStats from '@/components/SiteStats'
  import HeroHeading from '@/components/HeroHeading'
  import LeegFormForm from '@/components/leegs/form/Form'
  import { LeegTypes } from '@/store/mutation-types'

  export default {
    name: 'LeegNewPage',
    data () {
      return {
        scenario: '',
        form: {}
      }
    },
    methods: {
      changed (val) {
        this.form = Object.assign({}, this.form, val)
      },
      save () {
        let self = this
        self.loading = true
        self.$toast.open({ type: 'is-info', message: 'saving leeg...' })
        self.$store.dispatch(LeegTypes.save, this.form).then(resp => {
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
    components: {
      LeegFormForm,
      SiteStats,
      HeroHeading
    }
  }
</script>
