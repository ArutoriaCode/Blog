<template>
  <div class="post-container">
    <div class="post-bg-img-box">
      <v-img
        contain
        :src="require('~/static/images/bujibopu.jpg')"
        width="720px"
      ></v-img>
    </div>
    <div class="article-container">
      <div class="article-content">
        <div class="display-1">{{ title }}</div>
        <div class="flex-middle-between mt-8 mb-15">
          <div>
            <div class="d-flex justify-start align-center">
              <v-avatar size="48">
                <v-img :src="require('~/static/images/Elaina.jpg')"></v-img>
              </v-avatar>
              <div class="ml-4">
                <div class="font-weight-regular font-unineue font-weight-bold">
                  {{ name }}
                </div>
                <div class="caption mt-1">{{ nowTime }}</div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
        <div class="">
          少女宫下藤花，当她察觉到“世界之敌”的时候便会诞生出另一个名为“不吉波普”的人格。围绕着各种奇怪的事件，少年与少女们的故事慢慢展开了.
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
export default {
  layout: 'post',

  asyncData() {
    return new Promise((reject) => {
      setTimeout(() => {
        return reject({
          title: '不吉波普不笑',
          name: 'Arutoria',
          nowTime: dayjs().format('M月 DD,YYYY'),
        })
      }, 320)
    })
  },

  head() {
    return {
      title: this.title,
    }
  },

  validate({ params }) {
    // 必须是number类型
    return params.id === '1024'
  },
}
</script>
<style lang="scss">
.post-container {
  position: relative;
  margin: 36px auto;
  max-width: 720px !important;

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

.pc {
  .post-container {
    padding: 24px 0;
    margin-top: 64px !important;
  }
}
.mobile {
  .post-container {
    margin-top: 0;
  }
}
</style>
