<template>
  <div class="post-container">
    <div class="post-bg-img-box">
      <v-img
        :src="img"
        width="100%"
        max-height="405px"
      ></v-img>
    </div>
    <div class="article-container">
      <div class="article-content">
        <div class="display-1">{{ post.title }}</div>
        <div class="flex-middle-between mt-8 mb-15">
          <div>
            <div class="d-flex justify-start align-center">
              <v-avatar size="48">
                <v-img :src="require('~/static/images/Elaina.jpg')"></v-img>
              </v-avatar>
              <div class="ml-4">
                <div class="font-weight-regular font-unineue font-weight-bold">
                  {{ post.User.username }}
                </div>
                <div class="caption mt-1">{{ post.updated_at }}</div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
        <div class="">
          {{ post.content }}
        </div>
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
        <v-btn color="saber" small>请先登录</v-btn>
      </div>
    </v-card>
    <v-divider></v-divider>
    <div id="comments" class="comment-list-box"></div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import isSafeInteger from 'lodash/isSafeInteger'
export default {
  layout: 'post',

  data() {
    return {
      post: {}
    }
  },

  inject: {
    setHeart: {
      type: Function
    },
    setComment: {
      type: Function
    }
  },

  async asyncData({ $api, params }) {
    const post = await $api.get(`posts/${params.id}`)
    if (post.data && post.data.updated_at) {
      post.data.updated_at = dayjs(post.data.updated_at).format("M月 DD，YYYY")
    }

    return {
      post: post.data
    }
  },

  computed: {
    img() {
      if (this.post.data && this.post.data.img) {
        return this.post.data.img
      }

      return require('~/static/images/empty.png')
    }
  },

  created() {
    this.setHeart(this.post.heart)
  },

  head() {
    return {
      title: this.post.title || '',
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
  margin: 36px auto;
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
}

.theme--dark {
  .post-bg-img-box {
    background-color: #2f3133;
  }
}

.pc {
  .post-container {
    padding: 24px 0;
    margin-top: 64px !important;
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
