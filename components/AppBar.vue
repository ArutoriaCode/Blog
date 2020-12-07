<template>
  <div class="AppBar">
    <LeftNavigation v-model="showLeftNavigation"></LeftNavigation>
    <v-app-bar app fixed flat height="56px">
      <!-- Left Start -->
      <template v-if="isPost">
        <v-btn text small @click="$router.back()">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-spacer />
        <v-spacer />
      </template>
      <template v-else>
        <v-toolbar-title class="toolbar-title" v-text="title" />
        <v-spacer />
        <Tabs :class="_mobileHideClass" style="width: 278px"></Tabs>
        <v-spacer />
      </template>
      <!-- Left End -->
      <!-- Right Start -->
      <no-ssr>
        <div class="toolbar-right-content align-center">
          <template v-if="isPost">
            <v-btn class="px-2 _post" depressed text small @click.stop="handlerLike">
              <v-icon
                :class="heartClass"
                :color="heartColor"
              >
                mdi-heart
              </v-icon>
              <span class="pl-1 font-unineue-bold">{{ likeNum }}</span>
            </v-btn>
            <v-btn
              class="px-2 _post"
              depressed
              text
              small
              @click.stop="onScrollToComment"
            >
              <v-icon> mdi-message-processing </v-icon>
              <span class="pl-1 font-unineue-bold">{{ comment }}</span>
            </v-btn>
          </template>
          <v-btn
            :class="_mobileHideClass"
            depressed
            text
            small
            @click.stop="switchTheme"
          >
            <v-icon>
              {{
                $vuetify.theme.dark ? 'mdi-brightness-5' : 'mdi-brightness-2'
              }}
            </v-icon>
          </v-btn>
          <v-btn
            :class="_mobileHideClass"
            depressed
            color="saber"
            @click.stop="showAccount"
            v-if="!authority"
          >
            登录
          </v-btn>
          <v-menu close-on-click offset-y v-else>
            <template v-slot:activator="{ on, attrs }">
              <v-avatar
                v-if="authority"
                :class="_mobileHideClass"
                size="36"
                v-bind="attrs"
                v-on="on"
              >
                <v-img :src="avatar || defaultAvatar" />
              </v-avatar>
            </template>

            <v-list class="_menu_list" dense>
              <v-list-item link @click="onSetting">
                <v-icon size="20">mdi-cog</v-icon>
                设置
              </v-list-item>
              <v-list-item link @click="onLogout">
                <v-icon size="20">mdi-exit-to-app</v-icon>
                退出
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn
            depressed
            text
            icon
            class="d-lg-none d-xl-flex"
            @click="showLeftNavigation = true"
          >
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </div>
      </no-ssr>
      <!-- Right End -->
    </v-app-bar>
  </div>
</template>
<script>
import Tabs from './Tabs'
import LeftNavigation from './LeftNavigation'
import cloneDeep from 'lodash/cloneDeep'
import logout from '../utils/logout.js'
import { mapGetters, mapState } from 'vuex'
import { LIKE_TYPE } from '~/config/keys'
import { FAIL, SUCCESS } from '~/config/codes'

export default {
  components: {
    Tabs,
    LeftNavigation,
  },

  data() {
    return {
      title: 'Arutoria',
      showLeftNavigation: false,
      onLogout: logout.bind(this),
      defaultAvatar: require('~/static/images/Delta.jpg'),
    }
  },

  inject: {
    showAccount: {
      type: Function,
    },
  },

  computed: {
    ...mapState(['likes']),
    ...mapGetters(['authority', 'avatar']),

    _mobileHideClass() {
      return 'd-none d-xl-flex d-lg-flex ma-1'
    },

    isPost() {
      return this.$nuxt.$route.name === 'post-id'
    },

    currentPost() {
      return this.$store.state.posts[this.$route.params.id] || null
    },

    isLiked() {
      if (!this.currentPost) {
        return false
      }

      return this.likes.includes(LIKE_TYPE.POST + '-' + this.currentPost.id)
    },

    heartColor() {
      return this.isLiked ? 'red darken-1' : undefined
    },

    heartClass() {
      return this.isLiked
        ? ''
        : 'animate__animated animate__heartBeat animate__slower animate__infinite'
    },

    likeNum() {
      if (!this.isPost) {
        return 0
      }

      if (this.currentPost && this.currentPost.likeNum >= 0) {
        return this.currentPost.likeNum
      }

      return 0
    },

    comment() {
      if (!this.isPost) {
        return 0
      }

      if (this.currentPost && this.currentPost.comment >= 0) {
        return this.currentPost.comment
      }

      return 0
    },
  },

  methods: {
    switchTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },

    onScrollToComment() {
      document.getElementById('comments').scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    },

    onSetting() {},

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
          id: this.currentPost.id,
        })
        .then((rsp) => {
          if (rsp.code === FAIL) {
            this.$alert.info('你已经点过赞了哟！')
            return
          }

          if (rsp.code === SUCCESS) {
            this.$alert.success(rsp.msg)
            const post = cloneDeep(this.$store.state.posts)
            post[this.currentPost.id].likeNum++
            this.$store.commit('setPostCache', post)

            const joinKey = `${LIKE_TYPE.POST}-${this.currentPost.id}`
            const likes = [...this.likes, joinKey]
            this.$store.commit('setLikes', likes)
          }
        })
    },

    onCancelLike() {
      this.$api
        .post('/like/cancel', {
          type: LIKE_TYPE.POST,
          id: this.currentPost.id,
        })
        .then((rsp) => {
          if (rsp.code === FAIL) {
            this.$alert.info('取消点赞出现错误')
            return
          }

          if (rsp.code === SUCCESS) {
            this.$alert.success(rsp.msg)
            const post = cloneDeep(this.$store.state.posts)
            post[this.currentPost.id].likeNum--
            this.$store.commit('setPostCache', post)

            const joinKey = `${LIKE_TYPE.POST}-${this.currentPost.id}`
            const likes = this.likes.filter((v) => v !== joinKey)
            this.$store.commit('setLikes', likes)
          }
        })
    }
  },
}
</script>
<style lang="scss">
.toolbar-right-content {
  i.theme--light,
  ._post.theme--light .font-unineue-bold {
    color: #757575 !important;
  }
  i.theme--dark,
  ._post.theme--dark .font-unineue-bold {
    color: #ffffff !important;
  }
  ._post span.font-unineue-bold {
    font-size: 14px;
  }
}
.v-list._menu_list {
  .v-list-item .v-icon {
    margin-right: 8px;
  }
}
</style>
