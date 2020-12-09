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
      <div class="flex-middle-between">
        <h3 class="title">评论</h3>
        <v-btn text small color="orange lighten-2" @click="cancelReply" v-if="toName">取消回复</v-btn>
      </div>
      <div class="mt-2">
        <v-textarea
          v-model="commentContent"
          flat
          solo
          :label="label"
          counter
          no-resize
          :rules="commentRules"
          height="200px"
          id="comment"
        ></v-textarea>
      </div>
      <div class="d-flex justify-end">
        <v-btn color="saber" small v-if="!authority" @click="showAccount"
          >请先登录</v-btn
        >
        <v-btn
          color="saber"
          small
          v-if="authority"
          :disabled="!commentContent"
          :loading="loading"
          @click="sendComment"
          >{{ toName ? '回复' : '发表' }}</v-btn
        >
      </div>
    </v-card>
    <v-divider></v-divider>
    <v-card flat>
      <Comment
        v-for="comment in comments"
        :key="comment.id"
        :data="comment"
        @reply="onReply"
        @spread="onSpread"
      >
        <div
          class="sub-comment-list"
          :id="`cid-${comment.id}`"
          v-if="replys[comment.id] && replys[comment.id].status"
        >
          <Comment
            v-for="reply in replys[comment.id].data"
            @reply="onReply"
            :data="reply"
            :key="reply.id"
            :isComment="false"
          />
        </div>
      </Comment>
    </v-card>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import isSafeInteger from 'lodash/isSafeInteger'
import get from 'lodash/get'
import Editor from '@/components/Editor/index.vue'
import Comment from '@/components/Comment'
import { mapGetters } from 'vuex'
import { COMMENT_TYPE } from '~/config/keys'
import { SUCCESS } from '~/config/codes'
import { commentRules } from '@/utils/rules'

export default {
  components: {
    Editor,
    Comment,
  },

  data() {
    return {
      post: {},
      comments: [],
      replys: {},
      commentContent: '',
      loading: false,
      toId: null,
      toName: null,
      commentId: null,
      commentRules
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
    const comments = await $api.get(`postComment?id=${params.id}`)
    return {
      post: post.data,
      comments: comments.data,
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

    label() {
      if (this.toName) {
        return `回复${this.toName}：`
      }
      return '请在这里填写评论（不超过360个字符）'
    }
  },

  head() {
    return {
      title: this.postTitle,
    }
  },

  validate({ params }) {
    // Number是为了防止小数点'3.0'
    return isSafeInteger(Number(params.id))
  },

  methods: {
    sendComment() {
      const v = this.commentContent
      if (!v || (v && !v.trim()) || v.length >= 360) {
        return
      }

      if (this.loading === true) {
        return
      }

      this.loading = true
      const data = {
        type: COMMENT_TYPE.POST,
        ownerId: this.post.id,
        content: this.commentContent,
      }
      if (this.commentId && this.toId) {
        data.commentId = this.commentId
        data.toId = this.toId
      }

      this.$api
        .post('/comment/create', data)
        .then((rsp) => {
          this.loading = false
          this.commentId = null
          this.toId = null
          this.toName = null
          if (rsp.code === SUCCESS) {
            this.$alert.success('成功，评论审核通过后可显示。')
          }
        })
        .catch(() => {
          this.loading = false
          this.$alert.error('出错了！')
        })
    },

    onSpread({ commentId, status }) {
      this.spreadLoading = true
      const reply = this.replys[commentId]
      if (reply && reply.data) {
        reply.status = status
        this.replys[commentId] = { ...reply }
        this.spreadLoading = false
        // 如果是展开，那么开始滚动
        if (status) {
          this.scrollByReply(commentId)
        }
        return
      }

      this.$api
        .get(`/comment/reply?commentId=${commentId}`)
        .then((rsp) => {
          this.spreadLoading = false
          if (rsp.code === SUCCESS) {
            const reply = rsp.data.map((c) => {
              c.created_at = dayjs(c.created_at).format('YYYY-MM-DD HH:mm')
              return c
            })
            this.replys[commentId] = {
              data: reply,
              status: true,
            }
            this.scrollByReply(commentId)
          }
        })
        .catch((err) => {
          this.spreadLoading = false
        })
    },

    scrollByReply(commentId) {
      this.$nextTick(() => {
        const scroll = document.querySelector(
          `.sub-comment-list#cid-${commentId}`
        )

        if (scroll) {
          scroll.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })
        }
      })
    },

    onReply({ commentId, toId, toName }) {
      this.commentId = commentId
      this.toId = toId
      this.toName = toName
      const input = document.getElementById('comment')
      input.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })

      input.focus()
    },

    cancelReply() {
      this.commentId = null
      this.toId = null
      this.toName = null
    }
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
      }
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
