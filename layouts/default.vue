<template>
  <v-app :class="_AppClass">
    <Account v-model="show"></Account>
    <AppBar></AppBar>
    <v-main>
      <div
        :class="{ 'd-flex': $nuxt.isOffline }"
        class="flex-column justify-center align-center"
        style="height: 100%"
        v-show="$nuxt.isOffline"
      >
        <v-subheader class="error-alert-text font-unineue"
          >You Are Offline</v-subheader
        >
      </div>
      <nuxt v-show="!$nuxt.isOffline" />
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import 'animate.css'
import '@mdi/font/css/materialdesignicons.min.css'
import isEmpty from 'lodash/isEmpty'
import Account from '~/components/Account/Account.vue'
import AppBar from '~/components/AppBar.vue'
import Footer from '../components/Footer'
import offline from '../static/images/offline.png'
import { SUCCESS } from '~/config/codes'
import { mapGetters } from 'vuex'
import { ACCESS_TOKEN, USER_INFO } from '~/config/keys'

export default {
  components: {
    Account,
    AppBar,
    Footer,
  },

  data() {
    return {
      title: 'Arutoria',
      show: false,
    }
  },

  beforeMount() {
    const userInfo = this.$cookies.get(USER_INFO)
    const access_token = this.$cookies.get(ACCESS_TOKEN)
    if (!this.authority && access_token && !isEmpty(userInfo)) {
      this.$store.commit('setUserInfo', userInfo)
    }
  },

  provide() {
    return {
      showAccount: this.showAccount,
    }
  },

  computed: {
    ...mapGetters(['authority']),
    _AppClass() {
      return {
        pc: !this.$vuetify.breakpoint.mobile,
        mobile: this.$vuetify.breakpoint.mobile,
      }
    },
  },

  watch: {
    authority (value) {
      if (value === true) {
        this.updateLikes()
      }
    }
  },

  methods: {
    showAccount() {
      this.show = true
    },

    updateLikes() {
      const isLogin = !isEmpty(this.$store.state.user)
      const hasLikes = !isEmpty(this.$store.state.likes)
      if (isLogin && hasLikes) {
        return
      }

      const access_token = this.$cookies.get(ACCESS_TOKEN)
      this.$api.setToken(access_token, 'Bearer')
      // 获取当前登录用户全部点赞的信息
      this.$api.get('/like/all').then(rsp => {
        if (rsp.code === SUCCESS) {
          this.$store.commit('setLikes', rsp.data)
        }
      });
    }
  },
}
</script>
<style lang="scss">
.v-subheader.error-alert-text, .v-subheader.font-unineue {
  font-size: 30px !important;
  font-size: 2rem !important;
}
</style>
