<template>
  <v-alert
    class="Top-Alert"
    :type="type"
    :border="border"
    v-model="alert"
    :dense="dense"
    :dismissible="dismissible"
    :outlined="outlined"
    :prominent="prominent"
    :text="text"
    :icon="icon"
    transition="scroll-y-reverse-transition"
  >
    {{ msg }}
  </v-alert>
</template>
<script>
const defaults = {
  type: 'info',
  msg: '',
  border: undefined,
  coloredBorder: false,
  dense: false,
  dismissible: false,
  icon: undefined,
  outlined: false,
  prominent: false,
  text: false,
  timeout: 3000,
}
const types = ['success', 'info', 'warning', 'error']
export default {
  data() {
    return {
      alert: false,
      type: 'info',
      ...defaults,
    }
  },

  methods: {
    show(options = {}, type) {
      if (typeof options === 'string') {
        options = { msg: options }
      }

      options = { ...defaults, ...options }

      const {
        msg,
        border,
        coloredBorder,
        dense,
        dismissible,
        icon,
        outlined,
        prominent,
        text,
        timeout,
      } = options

      if (!type || !types.includes(type)) {
        type = options.type || 'info'
      }

      this.type = type
      this.msg = msg
      this.border = border
      this.coloredBorder = coloredBorder
      this.dense = dense
      this.dismissible = dismissible
      this.icon = icon
      this.outlined = outlined
      this.prominent = prominent
      this.text = text

      if (this.timer) {
        this.alert = false
        clearTimeout(this.timer)
      }

      this.$nextTick(() => {
        this.alert = true

        if (timeout === 0) {
          return
        }

        this.timer = setTimeout(() => {
          this.alert = false
        }, timeout)
      })
    },

    success(options = {}) {
      this.show(options, 'success')
    },

    info(options = {}) {
      this.show(options, 'info')
    },

    warn(options = {}) {
      this.show(options, 'warning')
    },

    error(options = {}) {
      this.show(options, 'error')
    },

    hide() {
      this.alert = false
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
  },
}
</script>
<style lang="scss">
.Top-Alert {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1999;
  &.success {
    background: #4caf50;
  }
  &.error {
    background: #ff5252;
  }
  &.info {
    background: #2196f3;
  }
  &.warning {
    background: #fb8c00;
  }
  .v-alert__content {
    padding-left: 8px;
  }
}
</style>
