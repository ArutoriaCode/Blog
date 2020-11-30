<template>
  <no-ssr>
    <div class="pageEditor">
      <v-subheader class="pa-0 title">编辑文章</v-subheader>
      <v-subheader class="pa-0">文章头图</v-subheader>
      <v-card flat height="240px" class="banner">
        <div
          class="d-flex flex-row justify-center align-center"
          style="height: 240px"
        >
          <v-file-input
            filled
            hide-input
          >
            <div slot="prepend-inner">
              <v-icon size="48">mdi-camera</v-icon>
            </div>
          </v-file-input>
          <span class="headline">点击上传文章头图</span>
        </div>
      </v-card>
      <div class="editor_title mt-4">
        <v-subheader class="pl-0">文章标题</v-subheader>
        <v-text-field hide-details dense label="请输入标题" v-model="title" solo flat />
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
      isPreview: false,
    }
  },

  methods: {
    onPreview() {
      this.$refs.editor.readOnly().then((rsp) => {
        this.isPreview = rsp
      })
    },

    sendPost() {
      // this.$api.post('/post/create', {
      //   content: postData,
      // }).then(rsp => {

      // })
    },
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
  .banner {
    .v-input {
      flex: none !important;
    }
  }
}
</style>
