<template>
  <section class='section'>
    <b-loading :active.sync="loading" :canCancel="true"></b-loading>
    <div class="columns">
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
          <div class="media-right">
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
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
  import { LeegTypes, GlobalTypes } from '@/store/mutation-types'
  import { mapGetters } from 'vuex'
  import ModalImageEditor from '@/components/ModalImageEditor'
  import api from '@/api'
  import debounce from 'debounce'

  export default {
    name: 'LeegNewForm',
    data () {
      return {
        clickToEdit: false,
        editingLogo: false,
        loading: false,
        nameInputType: '',
        nameInputMessage: '',
        scenario: '',
        form: {}
      }
    },
    computed: {
      ...mapGetters({
        currentUser: GlobalTypes.currentUser
      }),
      savable () {
        return this.form.name && this.form.name.length > 2 && this.form.managerEmail
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
    mounted () {
      if (this.currentUser && !this.form.managerEmail) {
        this.form.managerEmail = this.currentUser.email
      }
    },
    components: {
      ModalImageEditor
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
