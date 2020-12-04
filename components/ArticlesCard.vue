<template>
  <div class="post-main-item-box" elevation="1">
    <v-card class="post-main-item" flat>
      <v-img
        :aspect-ratio="16 / 9"
        :src="postImg"
        max-width="100%"
        max-height="400px"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="saber"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <v-lazy
        v-model="isActive"
        :options="{
          threshold: 0.5,
        }"
      >
        <div class="animate__animated animate__fadeInUp">
          <v-card-title> {{ post.title }} </v-card-title>
          <v-card-subtitle> {{ updatedAt }} </v-card-subtitle>
          <v-card-text v-if="post.shortContent">{{ post.shortContent }}</v-card-text>
        </div>
      </v-lazy>
      <v-card-actions class="_post_actions">
        <v-btn color="error" text :to="`/post/${post.id}`"> 开始阅读 </v-btn>
        <v-spacer></v-spacer>
        <div class="d-flex justify-center align-end flex-wrap">
          <v-btn text x-small>
            <v-icon size="20"> mdi-eye </v-icon>
            <span class="pl-1 font-pixer">{{ post.readCount }}</span>
          </v-btn>
          <v-btn text x-small @click="handlerLike">
            <v-icon size="20" :color="_heartColor" :class="_heartClass">
              mdi-heart
            </v-icon>
            <span class="pl-1 font-pixer">{{ post.likeNum }}</span>
          </v-btn>
          <v-btn text x-small>
            <v-icon size="20"> mdi-message-processing </v-icon>
            <span class="pl-1 font-pixer">{{ post.commentNum }}</span>
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import { mapGetters, mapState } from 'vuex'
import { CREDENTIALS_REQUIRED_TOKEN, FAIL, SUCCESS } from '~/config/codes'
import { LIKE_TYPE } from '~/config/keys'
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      isActive: false
    }
  },

  inject: {
    showAccount: {
      type: Function,
    },
  },

  computed: {
    ...mapState(['likes']),
    ...mapGetters(['authority']),

    postImg() {
      return this.post.img || require('~/static/images/Delta.jpg')
    },

    isLiked() {
      const joinKey = LIKE_TYPE.POST + '-' + this.post.id
      return this.$store.state.likes.includes(joinKey)
    },

    _heartColor() {
      return this.isLiked ? 'red darken-1' : undefined
    },

    _heartClass() {
      return this.isLiked
        ? ''
        : 'animate__animated animate__heartBeat animate__slower animate__infinite'
    },

    updatedAt() {
      return dayjs(this.post.updated_at).format('M月 DD，YYYY')
    }
  },

  methods: {
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
          type: LIKE_TYPE.POST,
          id: this.post.id,
        })
        .then((rsp) => {
          if (rsp.code === FAIL) {
            this.$alert.info('你已经点过赞了哟！')
            return
          }

          if (rsp.code === SUCCESS) {
            this.$alert.success(rsp.msg)
            this.post.likeNum++

            const joinKey = `${LIKE_TYPE.POST}-${this.post.id}`
            const likes = [...this.likes, joinKey]
            this.$store.commit('setLikes', likes)
          }
        })
    },

    onCancelLike() {
      this.$api
        .post('/like/cancel', {
          type: LIKE_TYPE.POST,
          id: this.post.id,
        })
        .then((rsp) => {
          if (rsp.code === FAIL) {
            this.$alert.info('取消点赞出现错误')
            return
          }

          if (rsp.code === SUCCESS) {
            this.$alert.success(rsp.msg)
            this.post.likeNum--

            const joinKey = `${LIKE_TYPE.POST}-${this.post.id}`
            const likes = this.likes.filter((v) => v !== joinKey)
            this.$store.commit('setLikes', likes)
          }
        })
    },
  },
}
</script>
<style lang="scss">
.post-main-item-box:first-child .post-main-item {
  margin-top: 0;
}
.post-main-item-box .post-main-item {
  margin-top: 24px;
}
._post_actions .d-flex .v-btn__content {
  display: flex;
  flex-direction: row !important;
  justify-content: center !important;
  align-items: flex-end !important;
  .font-pixer {
    font-size: 18px !important;
    font-size: 1.125rem !important;
  }
}
</style>
