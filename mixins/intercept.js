export default {
  data() {
    return {
      timer: null,
      second: 10,
      count: 0
    }
  },

  methods: {
    allowPassage(count = 5) {
      if (this.timer) {
        return false
      }

      if (this.count >= count) {
        this.timer = setInterval(() => {
          this.second--
          if (this.second === 0) {
            clearInterval(this.timer)
            this.count = 0
            this.second = 10
            this.timer = null
          }
        }, 1000)
        return false
      }

      this.count++
      return true
    }
  }
}