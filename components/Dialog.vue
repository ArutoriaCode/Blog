<template>
  <v-dialog
    class="Top-Dialog"
    v-model="dialog"
    :width="width"
    :max-width="maxWidth"
    transition="scroll-y-reverse-transition"
  >
    <v-card :dark="$vuetify.theme.dark">
      <v-card-title class="headline">
        <span v-if="title">{{ title }}</span>
      </v-card-title>

      <v-card-text v-if="typeof content === 'strng'">
        {{ content }}
      </v-card-text>

      <Render v-if="typeof content === 'function'" :render="content"></Render>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" v-if="cancelText" text @click.stop="_Cancel">
          {{ cancelText }}
        </v-btn>

        <v-btn color="saber" v-if="confirmText" text @click.stop="_Confirm">
          {{ confirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import Render from './Render'
const defaultValue = {
  dialog: false,
  title: '',
  content: '',
  onConfirm: () => {},
  onCancel: () => {},
  confirmText: '确认',
  cancelText: '取消',
  maxWidth: 600,
  width: 320,
}
export default {
  components: {
    Render,
  },
  data() {
    return {
      dialog: false,
      title: '',
      content: '',
      onConfirm: null,
      onCancel: null,
      confirmText: '确认',
      cancelText: '取消',
      maxWidth: 600,
      width: 320,
      ...defaultValue,
    }
  },

  methods: {
    show(options = {}) {
      const {
        title = '',
        content,
        onConfirm,
        onCancel,
        confirmText,
        cancelText,
        width,
        maxWidth,
      } = options
      this.title = title
      this.content = content
      this.onConfirm = onConfirm || defaultValue.onConfirm
      this.onCancel = onCancel || defaultValue.onCancel
      this.confirmText = confirmText || defaultValue.confirmText
      this.cancelText = cancelText || defaultValue.cancelText
      this.width = width || defaultValue.width
      this.maxWidth = maxWidth || defaultValue.maxWidth

      this.$nextTick(() => {
        this.dialog = true
      })
    },

    hide() {
      this.dialog = false
      this.dialog = defaultValue.dialog
      this.title = defaultValue.title
      this.content = defaultValue.content
      this.onConfirm = defaultValue.onConfirm
      this.onCancel = defaultValue.onCancel
      this.confirmText = defaultValue.confirmText
      this.cancelText = defaultValue.cancelText
    },

    _Confirm() {
      if (!this.onConfirm instanceof Function) {
        this.dialog = false
        return
      }

      const close = this.onConfirm()
      if (!close) {
        this.dialog = false
      }
    },

    _Cancel() {
      if (!this.onCancel || !this.onCancel instanceof Function) {
        this.dialog = false
        return
      }

      const close = this.onCancel()
      if (!close) {
        this.dialog = false
      }
    },
  },
}
</script>
<style lang="scss" scoped>

</style>