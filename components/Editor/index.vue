<template>
  <v-card
    :min-height="minHeight"
    rounded="lg"
    class="editor-card"
    flat
  >
    <div :id="id" :class="_ReadOnly" :style="_EditorPadding"></div>
  </v-card>
</template>
<script>
let Editor = null
let Header = null
let SimpleImage = null
let Marker = null
let LinkTool = null
let Embed = null
let Delimiter = null

if (process.client) {
  Editor = require('@editorjs/editorjs')
  Header = require('@editorjs/header')
  SimpleImage = require('@editorjs/simple-image')
  Marker = require('@editorjs/marker')
  LinkTool = require('@editorjs/link')
  Embed = require('@editorjs/embed')
  Delimiter = require('@editorjs/delimiter')
}

const dev = process.env.NODE_ENV !== 'production'
const getId = () => 'editor_' + new Date().getTime()
export default {
  props: {
    value: Object,
    minHeight: {
      type: [String, Number],
      default: 480
    },
    readonly: Boolean
  },

  data() {
    return {
      id: getId(),
      editor: null,
      isReadOnly: false,
    }
  },

  beforeMount() {
    // Editor.js 2.19 使用只读模式下会有错误提示，但不影响使用
    this.editor = new Editor({
      holder: this.id,
      readOnly: this.readonly,
      tools: {
        header: Header,
        image: SimpleImage,
        Marker: {
          class: Marker,
          shortcut: 'CMD+SHIFT+M',
        },
        link: {
          class: LinkTool,
          config: {
            endpoint: dev
              ? 'http://192.168.1.125:6140/api/v1/endpoint'
              : 'http://arutoria.com/api/v1/endpoint',
          },
        },
        embed: Embed,
        delimiter: Delimiter,
      },
      data: this.value,
      i18n: {
        messages: {
          toolNames: {
            Text: '段落',
            Heading: '标题',
            Marker: '高亮字段',
            Link: '链接',
            Delimiter: '分隔符'
          },
          blockTunes: {
            delete: {
              Delete: '删除块',
            },
            moveUp: {
              'Move up': '移至到上一块',
            },
            moveDown: {
              'Move down': '移至到下一块',
            },
          },
        },
      },
      onChange: () => {
        this.onChange()
      },
    })
  },

  beforeDestroy() {
    // this.editor.destroy();
    // 2.19版本调用destroy会报错，这里使用dom的删除
    if (this.editor) {
      document.getElementById(this.id).remove();
    }
  },

  methods: {
    onChange() {
      if (this.isReadOnly === true) {
        return
      }

      this.editor
        .save()
        .then((savedData) => {
          this.$emit('input', savedData)
        })
        .catch((error) => {
          console.error('Saving error', error)
        })
    },

    readOnly() {
      return this.editor.readOnly.toggle().then((rsp) => {
        this.isReadOnly = rsp
        return Promise.resolve(rsp)
      })
    },
  },

  computed: {
    _EditorPadding() {
      if (this.readonly) {
        return ''
      }

      let value = ''
      if (this.$vuetify.breakpoint.xs) {
        value = '20px'
      } else {
        value = '30px 50px'
      }

      return `padding: ${value}`
    },

    _ReadOnly() {
      return this.isReadOnly ? 'readonly' : ''
    }
  },
}
</script>
<style lang="scss">
.editor-card {
  .ce-block__content,
  .ce-toolbar__content {
    max-width: none;
  }

  .readonly {
    .ce-block .cdx-simple-image {
      .cdx-input.cdx-simple-image__caption {
        border: none;
        box-shadow: none;
        padding: 0px;
        text-align: center;
        width: 100%;
        font-size: 14px;
        font-size: 0.875rem;
        color: #8c8c8c;
      }
    }
  }
}
</style>
