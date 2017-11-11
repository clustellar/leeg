<template>
  <section>
    <h1>New Organization</h1>
    <organization-form></organization-form>
  </section>
</template>

<script>
  import OrganizationForm from '@/components/orgs/Form'

  export default {
    name: 'NewOrganizationsPage',
    data () {
      return {}
    },
    components: {
      OrganizationForm
    }
  }
</script>
