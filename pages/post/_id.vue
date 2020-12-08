<template>
  <div class="post-container">
    <div
      class="post-bg-img-box animate__animated animate__zoomIn"
      v-show="postImg"
    >
      <v-img :src="postImg" width="100%" max-height="405px" />
    </div>
    <div class="article-container">
      <div class="article-content">
        <div class="display-1">{{ postTitle }}</div>
        <div class="flex-middle-between mt-8 mb-15 author" v-if="postUser">
          <div class="d-flex justify-start align-center">
            <v-avatar size="48">
              <v-img
                :src="postUser.avatar || require('~/static/images/Delta.jpg')"
              ></v-img>
            </v-avatar>
            <div class="ml-4">
              <div class="font-weight-regular font-unineue font-weight-bold">
                {{ postUser.username }}
              </div>
              <div class="caption mt-1">{{ post.updated_at }}</div>
            </div>
          </div>
          <div class="d-flex justify-end align-center">
            <v-icon>mdi-eye</v-icon>
            <span class="font-unineue-bold">
              {{ post.readCount }}
            </span>
          </div>
        </div>
        <Editor v-if="post.content" :value="post.content" readonly></Editor>
      </div>
    </div>
    <v-divider></v-divider>
    <v-card flat class="mx-auto comment-card">
      <div class="flex-middle-between pr-6">
        <h3 class="title">评论</h3>
      </div>
      <div class="mt-2">
        <v-textarea
          flat
          solo
          name="input-7-4"
          label="请在这里填写评论"
        ></v-textarea>
      </div>
      <div class="d-flex justify-end">
        <v-btn color="saber" small v-if="!authority" @click="showAccount"
          >请先登录</v-btn
        >
        <v-btn color="amber lighten-3" text small v-if="authority">评论</v-btn>
      </div>
    </v-card>
    <v-divider></v-divider>
    <div id="comments" class="comment-list-box"></div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import isSafeInteger from 'lodash/isSafeInteger'
import get from 'lodash/get'
import { mapGetters } from 'vuex'
import Editor from '@/components/Editor/index.vue'

export default {
  components: {
    Editor,
  },

  data() {
    return {
      post: {},
    }
  },

  async asyncData({ $api, params, store }) {
    console.log('🚀 Get Cache')
    const posts = store.state.posts
    if (posts[params.id]) {
      return {
        post: posts[params.id],
      }
    }

    const post = await $api.get(`posts/${params.id}`)
    if (post.data && post.data.updated_at) {
      post.data.updated_at = dayjs(post.data.updated_at).format('M月 DD，YYYY')
    }

    if (post.data && typeof post.data.content === 'string') {
      post.data.content = JSON.parse(post.data.content)
    }

    store.commit('setPostCache', post.data)
    return {
      post: post.data,
    }
  },

  inject: {
    showAccount: {
      type: Function,
    },
  },

  computed: {
    ...mapGetters(['authority']),
    postImg() {
      if (this.post && this.post.img) {
        return this.post.img
      }

      return require('~/static/images/post_default.jpg')
    },

    postTitle() {
      if (this.post && this.post.title) {
        return this.post.title
      }

      return 'Arutoria'
    },

    postUser() {
      if (this.post && this.post.user) {
        return this.post.user
      }

      return null
    },
  },

  head() {
    return {
      title: this.postTitle,
    }
  },

  validate({ params }) {
    // 必须是number类型
    return isSafeInteger(Number(params.id))
  },
}
</script>
<style lang="scss">
.post-container {
  width: 100%;
  position: relative;
  margin: 0px auto 36px auto;
  max-width: 720px !important;
  .post-bg-img-box {
    background-color: #ffffff;
  }

  .article-container {
    padding: 40px 30px;
    background: #fff;
  }
  .comment-card {
    min-height: 200px;
    width: 100%;
    padding: 12px 20px;
    border-radius: 0px 0px 4px 4px !important;
    background: #fff;
  }
  .author {
    height: 48px;
    .d-flex {
      height: 48px;
      span {
        display: inline-block;
        margin-left: 4px;
        color: #757575 !important;
      };
    }
  }
}

.theme--dark {
  .post-bg-img-box {
    background-color: #2f3133;
  }
}

.pc {
  .post-container {
    padding: 12px 0;
    .post-bg-img-box {
      border-radius: 4px 4px 0 0;
    }
  }
}
.mobile {
  .post-container {
    margin-top: 0;
  }
}
</style>
