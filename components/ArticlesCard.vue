<template>
  <div class="post-main-item-box" elevation="1">
    <v-card class="post-main-item" flat>
      <v-img
        :aspect-ratio="16 / 9"
        :src="postImg"
        max-width="100%"
        max-height="400px"
      />

      <v-card-title> {{ post.title }} </v-card-title>

      <v-card-subtitle> 这是一段静态的文本 </v-card-subtitle>

      <v-card-actions class="_post_actions">
        <v-btn color="error" text :to="`/post/${post.id}`"> 开始阅读 </v-btn>
        <v-spacer></v-spacer>
        <div class="d-flex justify-center align-end flex-wrap">
          <v-btn text x-small>
            <v-icon size="20"> mdi-eye </v-icon>
            <span class="pl-1 font-pixer">{{ post.readCount }}</span>
          </v-btn>
          <v-btn text x-small @click="onLike">
            <v-icon
              size="20"
              :color="_heartColor"
              :class="_heartClass"
            >
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
import { CREDENTIALS_REQUIRED_TOKEN, SUCCESS } from '~/config/codes'
import { LIKE_TYPE } from '~/config/keys'
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },

  inject: {
    showAccount: {
      type: Function
    }
  },

  computed: {
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
      return this.isLiked ? '' : 'animate__animated animate__heartBeat animate__slower animate__infinite'
    }
  },

  methods: {
    onLike() {
      this.$api.post('/like', {
        type: LIKE_TYPE.POST,
        id: this.post.id
      }).then(rsp => {
        if (rsp.code === CREDENTIALS_REQUIRED_TOKEN) {
          this.showAccount()
        }

        if (rsp.code === SUCCESS) {
          this.$alert.success(rsp.msg);
          this.post.likeNum++
          this.post.isLiked = true
        }
      })
    }
  }
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
