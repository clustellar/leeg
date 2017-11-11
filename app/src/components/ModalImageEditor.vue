<template>
  <b-modal :active='active' :onCancel='cancel' :width="640">
    <div class="card">
      <div ref="croppie" style="margin-top:15px;"></div>
      <div class="card-image">
        <figure class="image">
          <b-loading :active.sync="loading" :canCancel="true"></b-loading>
          <!--<img :src="value || 'https://bulma.io/images/placeholders/256x256.png'">-->
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-128x128">
              <img :src="image || 'https://bulma.io/images/placeholders/256x256.png'">
            </figure>
          </div>
          <div class="media-content">
            <b-field>
              <b-input @change.native="loadUrl" placeholder='Image Url...'></b-input>
            </b-field>
            <div class="file">
              <label class="file-label">
                <input @change="loadFile" class="file-input" type="file">
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fa fa-upload"></i>
                  </span>
                  <span class="file-label">
                    or choose a file…
                  </span>
                </span>
              </label>
            </div>
          </div>
          <div class="media-right">
            <button @click='setImage' class="button is-primary">Set Image</button>
          </div>
        </div>

        <div class="content">
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
  import Croppie from 'croppie/croppie.js'
  import 'croppie/croppie.css'
  import api from '@/api'
  import binaryToBase64 from '@/helpers/binaryTobase64'

  export default {
    name: 'ModalImageEditor',
    props: {
      active: {
        type: Boolean,
        default: false
      },
      onCancel: {
        type: Function,
        required: false
      },
      value: {
        type: String,
        required: false
      }
    },
    data () {
      return {
        url: '',
        loading: false,
        image: null,
        opts: {
          viewport: { width: 256, height: 256 },
          boundary: { width: 400, height: 400 },
          showZoomer: true,
          enableResize: false,
          enableOrientation: true
        }
      }
    },
    methods: {
      initCroppie () {
        this.croppie = new Croppie(this.$refs.croppie, this.opts)
        if (this.value) {
          this.setValue(this.value)
        }
      },
      setValue (value) {
        this.croppie.bind({ url: value }).then(() => this.$snackbar.open('Loaded image.'))
      },
      cancel () {
        if (this.onCancel) {
          this.onCancel()
        }
      },
      loadUrl (e) {
        let self = this
        self.loading = true
        api.proxy.get(window.btoa(e.target.value), { responseType: 'blob' }).then(function (resp) {
          binaryToBase64(resp.data).then(function (b64) {
            self.loading = false
            self.url = e.target.value
            self.setValue(b64)
          }).catch(function (err) {
            self.loading = false
            self.$dialog.alert({
              title: 'Error converting image',
              message: err.toString(),
              type: 'is-danger',
              hasIcon: true,
              icon: 'times-circle',
              iconPack: 'fa'
            })
          })
        }).catch(function (err) {
          self.loading = false
          self.$dialog.alert({
            title: 'Error loading URL',
            message: err.toString(),
            type: 'is-danger',
            hasIcon: true,
            icon: 'times-circle',
            iconPack: 'fa'
          })
        })
      },
      // No way to detect CORS blocked requests
      loadUrlDirect (e) {
        let self = this
        this.loading = true
        this.url = e.target.value
        this.croppie.bind({
          url: this.url
        }).then(function () {
          self.loading = false
          self.url = e.target.value
        }).catch(function (err) {
          console.warn('Error loading direct URL', err)
          self.loadUrlProxy(e)
        })
      },
      loadFile (e) {
        let self = this
        if (e.target.files && e.target.files[0]) {
          let file = e.target.files[0]
          let reader = new FileReader()

          reader.onload = function (ee) {
            self.setValue(ee.target.result)
          }

          reader.readAsDataURL(file)
        }
      },
      setImage () {
        let self = this
        self.loading = true
        self.croppie.result({ type: 'base64', size: { width: 256, height: 256 } }).then(function (res) {
          self.loading = false
          self.image = res
          self.$emit('input', res)
        })
      }
    },
    mounted () {
      this.initCroppie()
      this.image = this.value || null
    }
  }
</script>
