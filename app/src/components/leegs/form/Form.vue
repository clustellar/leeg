<template>
  <section class='section'>
    <div class="columns">
      <modal-image-editor v-if="editingLogo" :value="value.logo" @input='setLogo' :active="editingLogo" :onCancel='() => editingLogo = false'></modal-image-editor>
      
      <div class="column">
        <article class="media">
          <figure class="media-left overlay-container" @mouseover='clickToEdit = true' @mouseout='clickToEdit = false'>
            <div :class="clickToEdit ? 'notification is-primary' : 'notification'" style='padding:1px;'>
              <div class='img-placeholder'>
                <img class='image is-256x256 overlay-image' :src="value.logo || 'https://bulma.io/images/placeholders/256x256.png'">
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
                  <b-input @keyup.native="validateName" :value="value.name" placeholder='League Name' required></b-input>
                </b-field>
              </div>
              <div class="column">
                <b-field label="">
                  <b-input type='email' :value="value.managerEmail" @input="setManagerEmail" placeholder="Manager's Email" required></b-input>
                </b-field>
              </div>
            </div>
            <b-field>
              <b-input type='textarea' rows='5' @input='setDescription' :value='value.description' placeholder='Description, Rules, or Information'></b-input>
            </b-field>
          </div>
          <div class="media-right">
            <slot name='right'></slot>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
  import ModalImageEditor from '@/components/ModalImageEditor'
  import api from '@/api'
  import debounce from 'debounce'

  export default {
    name: 'LeegForm',
    props: {
      value: {
        type: Object,
        required: true
      },
      logo: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        clickToEdit: false,
        editingLogo: false,
        loaded: false,
        nameInputType: '',
        nameInputMessage: ''
      }
    },
    methods: {
      setLogo (val) {
        this.$emit('input', { logo: val })
      },
      setManagerEmail (val) {
        this.$emit('input', { managerEmail: val })
      },
      setDescription (val) {
        this.$emit('input', { description: val })
      },
      validateName: debounce(function (e) {
        let self = this
        let name = e.target.value.replace(/\s+/g, '').toLowerCase()
        if (e.target.value) {
          this.$emit('input', { name: name })
          this.nameInputType = 'is-info'
          this.nameInputMessage = '<span class="fa fa-spinner fa-spin"></span> checking with server...'
          api.leeg.save({ name: name }, { params: { validate: true } }).then(function (resp) {
            console.log(resp)
            if (resp.valid) {
              self.$emit('input', { name: name })
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
      }, 1000)
    },
    computed: {
      privateInputMessage () {
        return this.value.private ? 'Only members will see the leeg listed.' : 'All users will see this leeg.'
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
