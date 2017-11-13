<template>
  <section class='section'>
    <b-loading :active.sync="loading" :canCancel="true"></b-loading>
    <div class="columns">
      <modal-image-editor v-if="editingLogo" v-model="form.logo" :active="editingLogo" :onCancel='() => editingLogo = false'></modal-image-editor>
      
      <div class="column is-two-thirds">
        <article class="media">
          <figure class="media-left overlay-container" @mouseover='clickToEdit = true' @mouseout='clickToEdit = false'>
            <div :class="clickToEdit ? 'notification is-primary' : 'notification'" style='padding:1px;'>
              <div class='img-placeholder'>
                <img class='image is-256x256 overlay-image' :src="form.logo || 'https://bulma.io/images/placeholders/256x256.png'">
                <div class="overlay-middle">
                  <button @click='editingLogo = true' class="button is-primary is-large overlay-text">Click to edit</button>
                </div>
              </div>
            </div>
          </figure>
          <div class="media-content">
          <b-field :type="nameInputType" :message='nameInputMessage' label="Name">
            <b-input @keyup.native="validateName" v-model="form.name" placeholder='enter org name...'></b-input>
          </b-field>
          <b-field>
            <b-input type='textarea' v-model='form.description' placeholder='description...'></b-input>
          </b-field>
          <div class="field" :message='privateInputMessage'>
            <b-switch v-model="form.private"> {{ form.private ? 'Private' : 'Public' }} - <span style='font-size:10px;'>{{ privateInputMessage }}</span></b-switch>
          </div>
            <nav class="level">
              <div class="level-left">
                <div class="level-item">
                  <button @click='save' :disabled='!savable' class="button is-success">Save</button>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <label class="checkbox">
                    <input type="checkbox"> Press enter to submit
                  </label>
                </div>
              </div>
            </nav>
          </div>
        </article>
      </div>
      <div class="column is-one-third">
        <pre>
          {{ form }}
        </pre>
      </div>
    </div>
  </section>
</template>

<script>
  import ModalImageEditor from '@/components/ModalImageEditor'
  import api from '@/api'
  import debounce from 'debounce'

  export default {
    name: 'OrganizationForm',
    props: {
      org: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        clickToEdit: false,
        editingLogo: false,
        loading: false,
        nameInputType: '',
        nameInputMessage: '',
        form: {}
      }
    },
    methods: {
      validateName: debounce(function (e) {
        let self = this
        if (e.target.value) {
          this.nameInputType = 'is-info'
          this.nameInputMessage = '<span class="fa fa-spinner fa-spin"></span> checking with server...'
          api.namespace.save(Object.assign({}, this.org, this.form), { params: { validate: true } }).then(function (resp) {
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
        self.$toast.open({ type: 'is-info', message: 'saving organization...' })
        api.namespace.save(Object.assign({}, this.org, this.form)).then(function (resp) {
          self.loading = false
          self.$snackbar.open({ type: 'is-success', message: 'Saved ' + self.form.name + '!' })
        }).catch(function (err) {
          self.loading = false
          self.$dialog.alert({
            title: 'Error saving organization!',
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
      privateInputMessage () {
        return this.form.private ? 'Only members will see the organization listed.' : 'All users will see this organization.'
      },
      savable () {
        return this.nameInputType === 'is-success'
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
