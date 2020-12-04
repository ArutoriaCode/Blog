<template>
  <no-ssr>
    <div class="pageEditor">
      <v-form ref="sendPost" lazy-validation>
        <v-subheader class="pa-0 title">编辑文章</v-subheader>
        <v-subheader class="pa-0">文章头图</v-subheader>
        <v-card flat :height="_HeadCardHeight" rounded="lg">
          <v-file-input
            :class="_FileClass"
            :style="`height: ${_HeadCardHeight}px`"
            hide-input
            hide-details
            :accept="accpet"
            prepend-icon="mdi-camera"
            v-model="headImg"
            :rules="headImgRules"
            show-size
            @change="onChangeFile"
          />
          <v-hover v-if="previewImg">
            <template v-slot:default="{ hover }">
              <v-img
                v-if="previewImg"
                class="preview rounded-lg"
                :src="previewImg"
                :height="_HeadCardHeight"
              >
                <v-fade-transition>
                  <v-overlay v-if="hover" absolute>
                    <v-btn
                      icon
                      rounded
                      height="48"
                      width="48"
                      @click.stop="deleteSelectFile"
                    >
                      <v-icon size="34">mdi-trash-can</v-icon>
                    </v-btn>
                  </v-overlay>
                </v-fade-transition>
              </v-img>
            </template>
          </v-hover>
        </v-card>
        <div class="editor_title mt-4">
          <v-subheader class="pl-0">文章标题</v-subheader>
          <v-text-field
            hide-details
            dense
            label="请输入标题"
            v-model="title"
            :rules="[(v) => !v || v.length > 0 || '文章标题必须输入']"
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
        <Editor v-model="content" ref="editor" />
        <div class="text-right mt-4">
          <v-btn color="saber" @click.stop="sendPost">
            发布
            <v-icon size="18" class="ml-2">mdi-send</v-icon>
          </v-btn>
        </div>
      </v-form>
    </div>
  </no-ssr>
</template>
<script>
import Editor from '@/components/Editor/index.vue'
import { INSUFFICIENT_PRIVILEGE_LEVEL, SUCCESS } from '~/config/codes'
export default {
  components: {
    Editor,
  },

  data() {
    return {
      title: '',
      content: {},
      headImg: '',
      isPreview: false,
      accpet: '.png,.jpg',
      headImgRules: [
        (v) => !v || v.size < 3000000 || '文章头图大小不能大于5MB',
      ],
      previewImg: null,
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

    _FileClass() {
      return {
        'file-upload': true,
        'd-flex flex-row justify-center align-center': !this.previewImg,
        'd-none': !!this.previewImg,
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
      if (this.content.blocks && this.content.blocks.length === 0) {
        this.$alert.error('请输入文章内容！')
        return
      }

      const allowRegister = this.$refs['sendPost'].validate()
      if (!allowRegister) {
        this.$alert.error('不行不行不行！')
        return
      }

      const formData = new FormData()
      formData.append('title', this.title)
      formData.append('content', JSON.stringify(this.content))
      formData.append('file', this.headImg)
      this.$api
        .post('/posts/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((rsp) => {
          if (rsp.code === INSUFFICIENT_PRIVILEGE_LEVEL) {
            this.$alert.error('无权限发表文章！')
            setTimeout(() => {
              this.$router.replace('/')
            }, 3000)
          }

          if (rsp.code === SUCCESS) {
            this.$alert.success('发表成功！')
          }
        })
    },

    onChangeFile(File) {
      this.previewImg = window.URL.createObjectURL(File)
    },

    deleteSelectFile() {
      this.$dialog.show({
        content: (h) => {
          return (
            <v-card-text class="d-flex flex-row align-center">
              <v-icon color="red" size="48">
                mdi-alert
              </v-icon>
              <span class="text-lg-h6 text-md-body-1 text-sm-body-2 text-xl-h4 pl-2">
                你确认要删除吗？
              </span>
            </v-card-text>
          )
        },
        onConfirm: () => {
          this.headImg = ''
          this.previewImg = null
        },
      })
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
  .file-upload {
    border: none;
    margin: 0;
    padding: 0;
    .v-icon:focus,
    .v-icon::after {
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
