<template>
  <div class="pageGuestbook">
    <div class="title" style="margin-bottom: 6px">留言</div>
    <v-textarea
      solo
      id="_message"
      v-model="message"
      flat
      :autofocus="!!fromName"
      :label="_TextareaLabel"
    />
    <div class="flex-middle-between mb-2">
      <v-subheader class="subinfo">欢迎留言</v-subheader>
      <v-btn color="primary" small v-if="!authority" @click="showAccount"
        >请先登录</v-btn
      >
      <v-btn
        color="saber"
        small
        v-else
        :disabled="message.length === 0"
        @click="onLeaveMessage"
        >留言</v-btn
      >
    </div>
    <v-card flat v-if="comments.length > 0">
      <div class="guestbook-item" v-for="comment in comments" :key="comment.id">
        <div style="padding: 10px 0 10px 10px" v-ripple>
          <div class="container-three">
            <div class="center float-left">
              <div class="subtitle-2 flex-middle">
                <span>{{ comment.fromName }}</span>
                <v-btn
                  color="primary"
                  x-small
                  elevation="0"
                  @click="onReply(comment.id, comment.fromId, comment.fromName)"
                  class="reply-btn"
                  >回复</v-btn
                >
              </div>
              <div class="caption">{{ comment.created_at }}</div>
            </div>
            <div class="left float-left">
              <v-avatar size="38">
                <v-img :src="comment.avatar">
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        :width="2"
                        size="28"
                        color="saber"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-avatar>
            </div>
            <div class="right float-left">
              <v-btn
                text
                rounded
                class="pa-0"
                @click.stop="handlerLike(comment)"
                width="24"
                height="24"
                min-width="24"
              >
                <v-icon
                  size="24"
                  :color="comment._heartColor"
                  :class="comment._heartClass"
                >
                  mdi-heart
                </v-icon>
              </v-btn>
              <div
                class="font-pixer text-center"
                style="line-height: 20px; font-size: 18px"
              >
                {{ comment.likeNum }}
              </div>
            </div>
          </div>
          <div class="pr-3">
            <div class="body-2">
              <p>{{ comment.content }}</p>
            </div>
          </div>
        </div>
        <div v-if="comment.commentReplayNum > 0">
          <div class="expand-reply">
            <v-btn x-small text>展开{{ comment.commentReplayNum }}条回复</v-btn>
          </div>
        </div>
        <v-divider></v-divider>
      </div>
    </v-card>
    <v-alert prominent class="empty-alert pa-16" v-else>
      <div slot="prepend">
        <v-img
          :src="require('~/static/images/comment_empty.png')"
          width="248"
        ></v-img>
      </div>
      <v-subheader class="font-unineue text-no-wrap">NOT COMMENT</v-subheader>
    </v-alert>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import { mapGetters, mapState } from 'vuex'
import { CREDENTIALS_REQUIRED_TOKEN, FAIL, SUCCESS } from '~/config/codes'
import { COMMENT_TYPE, LIKE_TYPE } from '~/config/keys'
import isSafeInteger from 'lodash/isSafeInteger'
import cloneDeep from 'lodash/cloneDeep'
export default {
  data: () => ({
    comments: [],
    message: '',
    commentId: null,
    toId: null,
    fromName: null,
  }),

  inject: {
    showAccount: {
      type: Function,
    },
  },

  async asyncData({ $api }) {
    try {
      const response = await $api.get('/guestbook')
      return {
        comments: response.code === SUCCESS ? response.data || [] : [],
      }
    } catch (error) {
      console.error('Get Comment Error:', error)
      return {
        comments: []
      }
    }
  },

  created() {
    this._initComments()
  },

  beforeMount() {
    console.log('likes ------------------------>', this.likes)
    this.updateLikes()
  },

  activated() {
    console.log('likes ------------------------>', this.likes)
    this.updateLikes()
  },

  computed: {
    ...mapState(['likes']),
    ...mapGetters(['authority']),

    _TextareaLabel() {
      return this.fromName ? `回复${this.fromName}：` : '留下你的足迹...'
    },
  },

  watch: {
    likes: {
      handler() {
        this.updateLikes()
      },
      deep: true
    },
  },

  methods: {
    _initComments() {
      if (this.comments && this.comments.length === 0) {
        return
      }

      this.comments.map((c) => {
        c.created_at = dayjs(c.created_at).format('YYYY-MM-DD HH:mm')
      })
    },

    updateLikes() {
      if (this.comments.length === 0 || this.likes.length === 0) {
        return
      }

      const comments = cloneDeep(this.comments)
      this.comments = comments.map((c) => {
        c.isLiked = this.likes.includes(c.type + '-' + c.id)
        c._heartColor = c.isLiked ? 'red darken-1' : undefined
        c._heartClass = c.isLiked
          ? ''
          : 'animate__animated animate__heartBeat animate__slower animate__infinite'
        return c
      })
    },

    onReply(commentId, toId, fromName) {
      this.commentId = commentId
      this.toId = toId
      this.fromName = fromName

      this.$nextTick(() => {
        const message = document.getElementById('_message')
        message.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })

        message.focus()
      })
    },

    onLeaveMessage() {
      if (!this.authority) {
        this.showAccount()
        return
      }

      const data = {
        content: this.message,
        type: COMMENT_TYPE.COMMENT,
      }

      if (isSafeInteger(this.commentId) && isSafeInteger(this.toId)) {
        data.commentId = this.commentId
        data.toId = this.toId
      }

      this.$api.post('/comment/create', data).then((rsp) => {
        this.toId = null
        this.fromName = null
        this.commentId = null
        if (rsp.code === SUCCESS) {
          this.$alert.success('发表成功！')
          return this.$api.get('/guestbook')
        }
      }).then(rsp => {
        if (rsp.code === SUCCESS) {
          this.comments = rsp.code === SUCCESS ? rsp.data || [] : []
        }
      })
    },

    handlerLike(comment) {
      if (!this.authority) {
        this.showAccount()
        return
      }

      if (!comment.isLiked) {
        this.onLike(comment)
      } else {
        this.onCancelLike(comment)
      }
    },

    onLike(comment) {
      this.$api
        .post('/like', {
          type: LIKE_TYPE.COMMENT,
          id: comment.id,
        })
        .then((rsp) => {
          if (rsp.code === FAIL) {
            this.$alert.info('你已经点过赞了哟！')
            return
          }

          if (rsp.code === SUCCESS) {
            this.$alert.success(rsp.msg)
            comment.likeNum++
            comment.isLiked = true
            comment._heartColor = comment.isLiked ? 'red darken-1' : undefined
            comment._heartClass = comment.isLiked
              ? ''
              : 'animate__animated animate__heartBeat animate__slower animate__infinite'
          }
        })
    },

    onCancelLike(comment) {
      this.$api
        .post('/like/cancel', {
          type: LIKE_TYPE.COMMENT,
          id: comment.id,
        })
        .then((rsp) => {
          if (rsp.code === FAIL) {
            this.$alert.info('取消点赞出现错误')
            return
          }

          if (rsp.code === SUCCESS) {
            this.$alert.success(rsp.msg)
            comment.likeNum--
            comment.isLiked = false
            comment._heartColor = comment.isLiked ? 'red darken-1' : undefined
            comment._heartClass = comment.isLiked
              ? ''
              : 'animate__animated animate__heartBeat animate__slower animate__infinite'
          }
        })
    },
  },
}
</script>
<style lang="scss">
.pageGuestbook {
  padding: 12px;
  margin: 0 auto;
  .subinfo {
    padding-left: 0;
    height: 32px;
  }
  .empty-alert {
    padding: 28px 0;
    .v-alert__wrapper {
      display: flex;
      flex-direction: column;
    }
    .v-alert__content {
      text-align: center;
    }
    .v-subheader.font-unineue {
      margin-top: 24px;
    }
  }
  .guestbook-item > * {
    box-sizing: border-box;
  }
  .container-three {
    overflow: hidden;
    padding-left: 40px;
    padding-right: 45px;
    .reply-btn {
      height: auto !important;
      padding: 0 4px !important;
      min-width: 45px !important;
      margin-left: 10px;
    }
    .center {
      width: 100%;
      padding: 0 4px;
    }
    .left {
      width: 40px;
      margin-left: -100%;
      position: relative;
      right: 40px;
      top: 2px;
      .v-avatar {
        margin-right: 12px !important;
        margin-bottom: 12px;
      }
    }
    .right {
      width: 45px;
      margin-right: -45px;
      text-align: center;
    }
  }
  .expand-reply {
    position: relative;
    padding-left: 62px;
    color: #999;
    font-size: 14px;
    margin-top: 5px;
    margin-bottom: 10px;
    &:before {
      position: absolute;
      content: '';
      top: 49.5%;
      left: 40px;
      width: 18px;
      height: 1px;
      background: #777;
    }
  }
}
</style>
