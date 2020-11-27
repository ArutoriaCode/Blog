<template>
  <div class="pageGuestbook">
    <div class="title" style="margin-bottom: 6px">留言</div>
    <v-textarea solo name="input-7-4" flat label="留下你的足迹..."></v-textarea>
    <div class="flex-middle-between mb-2">
      <v-subheader class="subinfo">欢迎留言</v-subheader>
      <v-btn color="primary" small @click="showAccount">请先登录</v-btn>
    </div>
    <v-card flat v-if="comments.length > 0">
      <div class="guestbook-item" v-for="comment in comments" :key="comment.id">
        <div style="padding: 10px 0 10px 10px" v-ripple>
          <div class="container-three">
            <div class="center float-left">
              <div class="subtitle-2 flex-middle">
                <span>{{ comment.fromName }}</span>
                <v-btn color="primary" x-small elevation="0" class="reply-btn">回复</v-btn>
              </div>
              <div class="caption">{{ comment.dateModifed }}</div>
            </div>
            <div class="left float-left">
              <v-avatar color="primary" size="38">
                <span class="white--text headline">38</span>
              </v-avatar>
            </div>
          </div>
          <div class="pr-3">
            <div class="body-2">
              <p>{{ comment.content }}</p>
            </div>
          </div>
        </div>
        <div>
          <div class="expand-reply">
            <v-btn x-small text>展开n条回复</v-btn>
          </div>
        </div>
        <v-divider></v-divider>
      </div>
    </v-card>
    <v-alert prominent class="empty-alert pa-16" v-else>
      <div slot="prepend">
        <v-img :src="require('~/static/images/comment_empty.png')" width="248"></v-img>
      </div>
      <v-subheader class="font-unineue text-no-wrap">NOT COMMENT</v-subheader>
    </v-alert>
  </div>
</template>
<script>
export default {
  data: () => ({
    comments: [],
  }),

  inject: {
    showAccount: {
      type: Function
    }
  },

  asyncData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve({
          comments: [],
        })
      }, 500)
    })
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
