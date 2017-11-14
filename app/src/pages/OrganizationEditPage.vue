<template>
  <section class="section">
    <organization-form></organization-form>
  </section>
</template>

<script>
  import OrganizationForm from '@/components/orgs/Form'

  export default {
    name: 'OrganizationEditPage',
    data () {
      return {}
    },
    components: {
      OrganizationForm
    }
  }
</script>
