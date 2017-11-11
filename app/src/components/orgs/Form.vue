<template>
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
        <b-field label="Name">
          <b-input v-model="form.name"></b-input>
        </b-field>
          <nav class="level">
            <div class="level-left">
              <div class="level-item">
                <a class="button is-info">Submit</a>
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
</template>

<script>
  import ModalImageEditor from '@/components/ModalImageEditor'

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
        form: {}
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
