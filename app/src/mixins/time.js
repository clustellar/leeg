import moment from 'moment'

var mixin = {
  methods: {
    from: function (val) {
      return moment().from(val)
    },
    to: function (val) {
      return moment().to(val)
    },
    format: function (val) {
      return moment(val).format('dddd, MMMM Do YYYY')
    }
  }
}

export default mixin
