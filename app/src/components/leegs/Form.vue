<template>
  <section class="pad-20">
    <b-loading :active.sync="loading" :canCancel="true"></b-loading>
    <div class="columns">
      <div class="column">
        <button @click='save' :disabled='pristine' class="button is-success">Save</button>
        <router-link :to='newSessionLink' v-if="isShowing('sessions')">
          <button class="button is-primary">Start new session</button>
        </router-link>
        <div v-if="isShowing('')">
          <leeg-form-form :logo='logo' :value='form' @input='changed'></leeg-form-form>
        </div>
        <div v-if="isShowing('permissions')">
          <leeg-form-permissions :value='form' @input='changed'></leeg-form-permissions>
        </div>
        <div v-if="isShowing('sessions')">
          <sessions-table></sessions-table>
        </div>
        <div v-if="isShowing('ownership')">
          
        </div>
        <div v-if="isShowing('admin')">
          
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { LeegTypes } from '@/store/mutation-types'
  import LeegFormForm from '@/components/leegs/form/Form'
  import LeegFormPermissions from '@/components/leegs/form/Permissions'
  import SessionsTable from '@/components/sessions/Table'
  import crypto from 'crypto'

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
        cache: {},
        loading: false
      }
    },
    computed: {
      leeg () {
        return this.$store.getters[LeegTypes.find](this.$route.params.leegId) || {}
      },
      logo () {
        return this.$store.getters[LeegTypes.logo](this.$route.params.leegId) || ''
      },
      form () {
        return Object.assign({}, this.leeg, this.cache)
      },
      dirty () {
        return this.formsha !== this.recordsha
      },
      pristine () {
        return !this.dirty
      },
      formsha () {
        return crypto.createHash('sha1').update(JSON.stringify(this.form)).digest('hex')
      },
      recordsha () {
        return crypto.createHash('sha1').update(JSON.stringify(this.leeg)).digest('hex')
      },
      newSessionLink () {
        return ['/leagues', this.leeg.id, '/sessions/new'].join('/').replace(/\/\//g, '/')
      }
    },
    methods: {
      changed (val) {
        this.cache = Object.assign({}, this.cache, val)
      },
      isShowing (name) {
        return this.show === name
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
      LeegFormPermissions,
      SessionsTable
    }
  }
</script>
