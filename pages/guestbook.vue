<template>
  <div class="pageGuestbook">
    <div class="title" style="margin-bottom: 6px">留言</div>
    <v-textarea solo name="input-7-4" label="留下你的足迹..."></v-textarea>
    <div class="flex-middle-between">
      <v-subheader class="subinfo">欢迎留言</v-subheader>
      <v-btn color="primary" small>请先登录</v-btn>
    </div>
    <v-card flat v-if="comments.length > 0">
      <div class="guestbook-item"></div>
    </v-card>
    <v-alert prominent class="mt-4 empty-alert" v-else>
      <div slot="prepend">
        <v-img :src="require('~/assets/images/empty.png')" width="248"></v-img>
      </div>
      <v-subheader>还没有人在这里留言，不妨留个言？</v-subheader>
      <v-btn text outlined>
        <v-icon left>mdi-pencil</v-icon>
        这就来
      </v-btn>
    </v-alert>
  </div>
</template>
<script>
export default {
  data: () => ({
    comments: [],
  }),
}
</script>
<style lang="scss">
.pageGuestbook {
  padding: 12px;
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
  }
}
</style>
