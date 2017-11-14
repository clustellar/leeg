var mixin = {
  methods: {
    capitalize: function (val) {
      val = val || ''
      return val.charAt(0).toUpperCase() + val.slice(1)
    }
  }
}

export default mixin
