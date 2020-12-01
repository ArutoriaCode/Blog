<template>
  <no-ssr>
    <div class="pageEditor">
      <v-subheader class="pa-0 title">编辑文章</v-subheader>
      <v-subheader class="pa-0">文章头图</v-subheader>
      <v-card flat :height="_HeadCardHeight">
        <v-file-input
          class="file-upload d-flex flex-row justify-center align-center"
          :style="`height: ${_HeadCardHeight}px`"
          hide-input
          hide-details
          :accept="accpet"
          prepend-icon="mdi-camera"
          @change="onChange"
        ></v-file-input>
      </v-card>
      <div class="editor_title mt-4">
        <v-subheader class="pl-0">文章标题</v-subheader>
        <v-text-field
          hide-details
          dense
          label="请输入标题"
          v-model="title"
          solo
          flat
        />
      </div>
      <div class="d-flex flex-row justify-space-between align-center">
        <v-subheader class="pa-0">文章内容</v-subheader>
        <v-btn text color="saber" @click="onPreview" small>
          {{ isPreview ? '编辑' : '预览' }}
        </v-btn>
      </div>
      <Editor v-model="postData" ref="editor" />
      <div class="text-right mt-4">
        <v-btn color="saber" @click.stop="sendPost">
          发布
          <v-icon size="18" class="ml-2">mdi-send</v-icon>
        </v-btn>
      </div>
    </div>
  </no-ssr>
</template>
<script>
import Editor from '@/components/Editor/index.vue'
export default {
  components: {
    Editor,
  },

  data() {
    return {
      title: '',
      postData: {},
      headImg: '',
      isPreview: false,
      accpet: '.png,.jpg'
    }
  },

  computed: {
    _HeadCardHeight() {
      if (this.$vuetify.breakpoint.xs) {
        return 150
      }
      if (this.$vuetify.breakpoint.sm) {
        return 250
      } else {
        return 350
      }
    },
  },

  methods: {
    onPreview() {
      this.$refs.editor.readOnly().then((rsp) => {
        this.isPreview = rsp
      })
    },

    sendPost() {
      // this.$api
      //   .post('/post/create', {
      //     title: this.title,
      //     content: this.postData,
      //     img: this.headImg,
      //   })
      //   .then((rsp) => {})
    },

    onChange(File) {

    }
  },
}
</script>
<style lang="scss">
.pageEditor {
  .editor_title {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .codex-editor--narrow .link-tool__image {
    display: block;
  }
  .file-upload {
    border: none;
    margin: 0;
    padding: 0;
    .v-icon:focus, .v-icon::after {
      opacity: 0;
    }
    .v-input__icon {
      height: 100%;
      width: 100%;
      .mdi.mdi-camera {
        height: 100%;
        width: 100%;
        opacity: 1 !important;
        &::before {
          font-size: 36px;
          font-size: 2.25rem;
        }
      }
    }
    .v-input__prepend-outer {
      height: 100%;
      width: 100%;
      margin: 0;
    }
  }
}
</style>
