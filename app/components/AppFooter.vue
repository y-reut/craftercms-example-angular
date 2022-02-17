<template>
  <span>
    {{`${model.copy_s} ${new Date().getFullYear()}`}}
  </span>
</template>

<script>
export default {
  name: 'AppFooter',
  computed: {
    model () {
      return this.$store.state.footer.model
    }
  },
  data () {
    return {
      title: 'Footer'
    }
  }
}
</script>