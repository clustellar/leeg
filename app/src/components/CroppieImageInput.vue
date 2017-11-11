<template>
  <div class="field">
    <label class="label">
      {{ label }}
      <a @click.stop.prevent="toggle" title="Show and hide image editor">
        <span class="icon">
          <i class="fa fa-eye"></i>
        </span>
      </a>
    </label>
    <div>
      <nav v-show="editing" class="navbar">
        <div class="navbar-end">
          <button @click.stop.prevent="popup" class="button">
            Preview
          </button>
          <button @click.stop.prevent="triggerEmit" class="button is-success">
            Done Editing
          </button>
        </div>
      </nav>
      <nav v-show="!editing" class="navbar">
        <a class="navbar-item">
          <div class="file">
            <label class="file-label">
              <input @change="loadFile" class="file-input" type="file" accept="image/*">
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fa fa-upload"></i>
                </span>
                <span class="file-label">
                  Choose a file…
                </span>
              </span>
            </label>
          </div>
        </a>
        <a v-if="allowUrl" class="navbar-item">
          <input @change="loadUrl" class="input" type="text" placeholder="image url...">
        </a>
      </nav>
      <div ref="croppie" style="margin-top:15px;"></div>
    </div>
  </div>
</template>

<script>
  import Croppie from 'croppie/croppie.js'
  import 'croppie/croppie.css'
  import { MessageTypes } from '@/store/mutation-types'

  export default {
    name: 'CroppieImageInput',
    props: {
      value: {
        type: String
      },
      label: {
        type: String,
        default: 'Image'
      },
      allowUrl: {
        type: Boolean,
        default: true
      },
      format: {
        type: String,
        default: 'base64'
      }
    },
    data () {
      return {
        showing: false,
        editing: false,
        crop: null,
        url: null,
        file: null,
        opts: {
          viewport: { width: 600, height: 300 },
          boundary: { width: 600, height: 300 },
          showZoomer: true,
          enableResize: false,
          enableOrientation: true
        }
      }
    },
    mounted () {
      this.initCroppie()
    },
    methods: {
      initCroppie () {
        this.croppie = new Croppie(this.$refs.croppie, this.opts)
        if (this.value) {
          this.setValue(this.value)
        }
      },
      setValue (value) {
        this.croppie.bind({ url: value })
      },
      popup () {
        let self = this
        self.croppie.result('base64', { size: 'viewport' }).then(function (src) {
          self.$store.dispatch(MessageTypes.add, {
            title: 'Image Preview',
            content: '<img src="' + src + '" />'
          })
        })
      },
      triggerEmit () {
        let self = this
        self.getResult().then(function (res) {
          self.$emit('input', res)
          self.editing = false
          self.showing = false
        })
      },
      getResult () {
        return this.croppie.result(this.format)
      },
      toggle () {
        this.showing = !this.showing
      },
      loadFile (e) {
        let self = this
        if (e.target.files && e.target.files[0]) {
          let file = e.target.files[0]
          let reader = new FileReader()

          reader.onload = function (ee) {
            self.croppie.bind({
              url: ee.target.result
            }).then(function () {
              self.editing = true
            })
          }

          reader.readAsDataURL(file)
          self.file = file
        }
      },
      loadUrl (e) {
        let self = this
        this.url = e.target.value
        this.croppie.bind({
          url: '/proxy/' + this.url
        }).then(function () {
          self.editing = true
        })
      }
    }
  }
</script>
