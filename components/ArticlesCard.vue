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

      <v-card-actions>
        <v-btn color="error" text :to="`/post/${post.id}`"> 开始阅读 </v-btn>
        <v-spacer></v-spacer>
        <div class="d-flex justify-center align-end flex-wrap">
          <v-btn text x-small>
            <v-icon size="20"> mdi-eye </v-icon>
            <span class="pl-1 font-pixer">{{ post.readCount }}</span>
          </v-btn>
          <v-btn text x-small>
            <v-icon
              size="20"
              class="animate__animated animate__heartBeat animate__slower animate__infinite"
            >
              mdi-heart
            </v-icon>
            <span class="pl-1 font-pixer">{{ post.heart }}</span>
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
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },

  computed: {
    postImg() {
      return this.post.img || require('~/static/images/Delta.jpg')
    },
  },
}
</script>
<style lang="scss" scoped>
.post-main-item-box:first-child .post-main-item {
  margin-top: 0;
}
.post-main-item-box .post-main-item {
  margin-top: 24px;
}
</style>
