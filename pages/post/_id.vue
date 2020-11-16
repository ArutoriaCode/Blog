<template>
  <div class="post-container">
    <div class="post-bg-img-box">
      <v-img
        :src="require('~/static/images/bujibopu.jpg')"
        height="100%"
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
                <div class="font-weight-regular font-unineue font-weight-bold">{{ name }}</div>
                <div class="caption mt-1">{{ nowTime }}</div>
              </div>
            </div>
          </div>
          <div>

          </div>
        </div>
        <div class="">
          少女宫下藤花，当她察觉到“世界之敌”的时候便会诞生出另一个名为“不吉波普”的人格。围绕着各种奇怪的事件，少年与少女们的故事慢慢展开了.
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
export default {
  layout: 'post',

  data() {
    return {
      title: '不吉波普不笑',
      name: 'Arutoria',
      nowTime: dayjs().format('M月 DD,YYYY')
    }
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
  margin-top: 0;
  padding: 24px 0;

  .article-container {
    padding: 40px 30px;
    background: #fff;
  }
}
</style>
