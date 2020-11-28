<template>
  <div class="pageGuestbook">
    <div class="title" style="margin-bottom: 6px">留言</div>
    <v-textarea
      solo
      name="input-7-4"
      v-model="message"
      flat
      label="留下你的足迹..."
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
                <v-btn color="primary" x-small elevation="0" class="reply-btn"
                  >回复</v-btn
                >
              </div>
              <div class="caption">{{ comment.created_at }}</div>
            </div>
            <div class="left float-left">
              <v-avatar color="primary" size="38">
                <span class="white--text headline">38</span>
              </v-avatar>
            </div>
            <div class="right float-left" @click="onLike">
              <v-btn text class="pa-0" width="24" height="24" min-width="24">
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
                style="line-height: 20px; font-size: 18px;"
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
import { mapGetters } from 'vuex'
import { SUCCESS } from '~/config/codes'
import { COMMENT_TYPE, LIKE_TYPE } from '~/config/keys'
export default {
  data: () => ({
    comments: [],
    message: '',
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
        comments: response.code === SUCCESS ? response.data : [],
        message: '',
      }
    } catch (error) {
      console.error('Get Comment Error:', error)
      return {
        posts: [],
        message: '',
      }
    }
  },

  created() {
    this._initComments()
  },

  computed: {
    ...mapGetters(['authority']),
  },

  methods: {
    _initComments() {
      if (this.comments.length === 0) {
        return
      }

      this.comments.map((c) => {
        c.created_at = dayjs(c.created_at).format('YYYY-MM-DD HH:mm')
        const joinKey = LIKE_TYPE.COMMENT + '-' + c.id
        const isLiked = this.$store.state.likes.includes(joinKey)
        c._heartColor = isLiked ? 'red darken-1' : undefined
        c._heartClass = isLiked
          ? ''
          : 'animate__animated animate__heartBeat animate__slower animate__infinite'
      })
    },

    onLeaveMessage() {
      this.$api
        .post('/comment/create', {
          content: this.message,
          type: COMMENT_TYPE.COMMENT,
        })
        .then((rsp) => {
          if (rsp.code === SUCCESS) {
            this.$alert.success('发表成功！')
          }
        })
    },

    onLike() {
      if (!this.authority) {
        this.showAccount()
        return
      }
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
