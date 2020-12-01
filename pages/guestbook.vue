<template>
  <div class="pageGuestbook">
    <div class="flex-middle-between">
      <div class="title" style="margin-bottom: 6px">留言</div>
      <v-btn text color="orange lighten-2" v-if="toId" @click="onCancelReply"
        >取消回复</v-btn
      >
    </div>
    <v-textarea
      solo
      id="_message"
      v-model="message"
      flat
      :autofocus="!!toName"
      :label="_TextareaLabel"
      hide-details
    />
    <div class="flex-middle-between mt-2 mb-2">
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
        >{{ toName ? '回复' : '留言' }}</v-btn
      >
    </div>
    <v-card flat v-if="comments.length > 0">
      <Comment
        v-for="comment in comments"
        @reply="onReply"
        @spread="onSpread"
        :spreadLoading="spreadLoading"
        :key="comment.id"
        :data="comment"
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
    <v-alert prominent class="empty-alert pa-16" v-else>
      <div slot="prepend">
        <v-img
          :src="require('~/static/images/comment_empty.png')"
          width="248"
        />
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
import Comment from '@/components/Comment'
import isEmpty from 'lodash/isEmpty'
export default {
  inject: {
    showAccount: {
      type: Function,
    },
  },

  data: () => ({
    comments: [],
    replys: {},
    message: '',
    commentId: null,
    toId: null,
    toName: null,

    spreadLoading: false,
  }),

  components: {
    Comment,
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
        comments: [],
      }
    }
  },

  created() {
    this._initComments()
  },

  beforeMount() {
    this.updateLikes()
  },

  computed: {
    ...mapState(['likes']),
    ...mapGetters(['authority']),
    _TextareaLabel() {
      return this.toName ? `回复${this.toName}：` : '留下你的足迹...'
    },
  },

  watch: {
    likes: {
      handler(value) {
        this.updateLikes()
      },
      deep: true,
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

    onCancelReply() {
      this.commentId = null
      this.toId = null
      this.toName = null
    },

    onReply({ commentId, toId, toName }) {
      this.commentId = commentId
      this.toId = toId
      this.toName = toName
      const input = document.getElementById('_message')
      input.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })

      input.focus()
    },

    /** 展开该条评论下所有的回复 */
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
        scroll.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
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

      this.$api
        .post('/comment/create', data)
        .then((rsp) => {
          this.toId = null
          this.toName = null
          this.commentId = null
          this.message = ''
          if (rsp.code === SUCCESS) {
            this.$alert.success('发表成功！')
            return this.$api.get('/guestbook')
          }
        })
        .then((rsp) => {
          if (rsp.code !== SUCCESS) {
            return
          }
          this.comments = rsp.code === SUCCESS ? rsp.data || [] : []
          this.updateLikes()
        })
    },

    updateLikes() {
      this.comments.map((c) => this.setLikeStatusAndClass(c))
      this.comments = [...this.comments]
      if (!isEmpty(this.replys)) {
        Object.values(this.replys).map((c) => this.setLikeStatusAndClass(c))
        this.replys = { ...this.replys }
      }
    },

    setLikeStatusAndClass(c) {
      if (this.likes.length === 0) {
        c.isLiked = false
      } else {
        const joinKey = LIKE_TYPE.COMMENT + '-' + c.id
        c.isLiked = this.likes.includes(joinKey)
      }

      c.heartColor = c.isLiked ? 'red darken-1' : undefined
      c.heartClass = c.isLiked
        ? ''
        : 'animate__animated animate__heartBeat animate__slower animate__infinite'
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
  .sub-comment-list {
    padding-left: 28px;
    margin-top: 5px;
  }
}
</style>
