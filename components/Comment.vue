<template>
  <div class="comment-item" v-if="hasComment">
    <div style="padding: 10px 0 10px 10px" v-ripple>
      <div class="container-three">
        <div class="center float-left">
          <div class="subtitle-2 flex-middle">
            <span>{{ comment.fromName }}</span>
            <v-btn
              color="primary"
              x-small
              elevation="0"
              @click="onReply"
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
                <v-row class="fill-height ma-0" align="center" justify="center">
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
              :color="heartColor"
              :class="heartClass"
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
          <span v-if="comment.toId">
            回复 <span class="toUserName">@{{ comment.toName }}</span
            >：
          </span>
          <p>{{ comment.content }}</p>
        </div>
      </div>
    </div>
    <slot></slot>
    <div v-if="isComment && comment.commentReplayNum > 0">
      <div class="expand-reply">
        <v-btn
          small
          text
          v-if="!spreadStatus"
          @click="onSpread"
          :loading="spreadLoading"
          >展开{{ comment.commentReplayNum }}条回复</v-btn
        >
        <v-btn small text v-else @click="onSpread">收起</v-btn>
      </div>
    </div>
    <v-divider v-if="isComment"></v-divider>
  </div>
</template>
<script>
import cloneDeep from 'lodash/cloneDeep'
import { mapGetters, mapState } from 'vuex'
import { FAIL, SUCCESS } from '~/config/codes'
import { LIKE_TYPE } from '~/config/keys'
import isEmpty from 'lodash/isEmpty'
export default {
  props: {
    data: Object,
    /** 当前是否为评论（非回复他人评论或回复另外一条回复），默认为true */
    isComment: {
      type: Boolean,
      default: true,
    },

    spreadLoading: Boolean,
  },

  provide() {
    return {
      parentId: this.data.id,
    }
  },

  data() {
    return {
      spreadStatus: false,
      comment: {},
    }
  },

  inject: {
    showAccount: {
      type: Function,
    },

    parentId: {
      type: [Number, String, null],
      default: null,
    },
  },

  computed: {
    ...mapState(['likes']),
    ...mapGetters(['authority']),

    hasComment() {
      return !isEmpty(this.comment)
    },

    isLiked() {
      return this.likes.includes(LIKE_TYPE.COMMENT + '-' + this.comment.id)
    },

    heartColor() {
      return this.isLiked ? 'red darken-1' : undefined
    },

    heartClass() {
      return this.isLiked
        ? ''
        : 'animate__animated animate__heartBeat animate__slower animate__infinite'
    },
  },

  watch: {
    data: {
      handler(value) {
        this.comment = value
      },
      deep: true,
    },
  },

  created() {
    this.comment = this.data
  },

  methods: {
    onReply() {
      if (this.isComment) {
        // 回复本条评论
        this.$emit('reply', {
          commentId: this.comment.id,
          toId: this.comment.fromId,
          toName: this.comment.fromName,
        })
      } else {
        // 回复本条回复
        this.$emit('reply', {
          commentId: this.parentId,
          toId: this.comment.fromId,
          toName: this.comment.fromName,
        })
      }
    },

    onSpread() {
      this.spreadStatus = !this.spreadStatus
      this.$emit('spread', {
        commentId: this.comment.id,
        status: this.spreadStatus,
      })
    },

    handlerLike() {
      if (!this.authority) {
        this.showAccount()
        return
      }

      if (!this.isLiked) {
        this.onLike()
      } else {
        this.onCancelLike()
      }
    },

    onLike() {
      this.$api
        .post('/like', {
          type: LIKE_TYPE.COMMENT,
          id: this.comment.id,
        })
        .then((rsp) => {
          if (rsp.code === FAIL) {
            this.$alert.info('你已经点过赞了哟！')
            return
          }

          if (rsp.code === SUCCESS) {
            this.$alert.success(rsp.msg)
            this.comment.likeNum++

            const joinKey = `${LIKE_TYPE.COMMENT}-${this.comment.id}`
            const likes = [...this.likes, joinKey]
            this.$store.commit('setLikes', likes)
            this.comment = { ...this.comment }
          }
        })
    },

    onCancelLike() {
      this.$api
        .post('/like/cancel', {
          type: LIKE_TYPE.COMMENT,
          id: this.comment.id,
        })
        .then((rsp) => {
          if (rsp.code === FAIL) {
            this.$alert.info('取消点赞出现错误')
            return
          }

          if (rsp.code === SUCCESS) {
            this.$alert.success(rsp.msg)
            this.comment.likeNum--

            const joinKey = `${LIKE_TYPE.COMMENT}-${this.comment.id}`
            const likes = this.likes.filter((v) => v !== joinKey)
            this.$store.commit('setLikes', likes)
            this.comment = { ...this.comment }
          }
        })
    }
  },
}
</script>
<style lang="scss">
.comment-item {
  * {
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
  .toUserName {
    color: #ffc069;
  }
}
</style>
