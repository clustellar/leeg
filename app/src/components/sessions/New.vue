<template>
  <div class="pad-20">
    <hero-heading title='Start a new session!' subtitle='A new session is a new instance of a league.  It can be a class, round, event, it is a specific time/location of the league.'></hero-heading>
    <session-form :value='form' @input='changed' @save='save'></session-form>
    <pre>{{ form }}</pre>
  </div>
</template>

<script>
  import HeroHeading from '@/components/HeroHeading'
  import SessionForm from '@/components/sessions/Form'
  import { SessionTypes } from '@/store/mutation-types'

  export default {
    name: 'SessionNewPage',
    data () {
      return {
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
        self.$store.dispatch(SessionTypes.save, this.form).then(resp => {
          self.loading = false
          self.$snackbar.open({ type: 'is-success', message: 'Saved ' + self.form.name + '!' })
        }).catch(err => {
          self.loading = false
          self.$dialog.alert({
            title: 'Error saving session!',
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
      SessionForm,
      HeroHeading
    }
  }
</script>