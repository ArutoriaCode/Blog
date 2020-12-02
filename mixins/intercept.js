export default {
  data() {
    return {
      timer: null,
      resetTimer: null,
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
        clearTimeout(this.resetTimer)
        this.timer = setInterval(() => {
          this.second--
          if (this.second === 0) {
            clearInterval(this.timer)
            this.count = 0
            this.second = 10
            this.timer = null
            this.resetTimer = null
          }
        }, 1000)
        return false
      }

      this.count++
      
      if (this.resetTimer) {
        return true
      }
      
      // 30秒内没有超过次数，清除已累计的次数
      this.resetTimer = setTimeout(() => {
        this.second = 10
        this.count = 0
        this.timer = null
      }, 30000)
      return true
    }
  }
}