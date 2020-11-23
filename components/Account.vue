<template>
  <v-dialog v-model="dialog" :fullscreen="$vuetify.breakpoint.mobile">
    <v-card>
      <div class="display-1">Hello World</div>
      <div class="display-1">Hello World</div>
      <div class="display-1">Hello World</div>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    value: Boolean
  },

  data() {
    return {
      dialog: false,

      email: '',
      password: '',
    }
  },

  created() {
    this.dialog = this.value
  },

  watch: {
    value(v) {
      this.dialog = v
      this.$emit('input', v)
    }
  }
}
</script>
