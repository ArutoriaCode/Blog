<template>
  <v-card min-height="240px" :height="height" class="editor-card" flat>
    <div id="editor"></div>
  </v-card>
</template>
<script>
let Editor = null
if (process.client) {
  Editor = require('@editorjs/editorjs')
}

export default {
  props: {
    height: [String, Number]
  },

  mounted() {
    this.editor = new Editor({
      holder: 'editor',
      readOnly: false,
      onChange: () => {
        this.onChange()
      }
    })
  },

  methods: {
    onChange() {
      this.editor.save().then((savedData) => {
        console.log('Save Success', savedData);
      }).catch((error) => {
        console.error('Saving error', error);
      });
    }
  }
}
</script>
<style lang="scss">
.editor-card {
  padding: 6px 12px;
}
</style>
