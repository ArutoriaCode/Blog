<template>
  <v-dialog
    max-width="490"
    v-model="dialog"
    persistent
    :fullscreen="$vuetify.breakpoint.name === 'xs'"
    transition="scroll-y-reverse-transition"
  >
    <v-card class="account-card">
      <div class="back-header">
        <v-btn text @click="dialog = false">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </div>
      <div class="account-box">
        <header>
          <div class="top">
            <h2 class="d-flex flex-row justify-space-between">
              欢迎回来，
              <v-btn text color="red accent-2" v-if="isLogin" @click.stop="isLogin = false"> 注册 </v-btn>
              <v-btn text color="red accent-2" v-else @click.stop="isLogin = true"> 登录 </v-btn>
            </h2>
            <h3 v-if="isLogin">请填写以下信息进行登录</h3>
            <h3 v-else>请填写以下信息进行注册</h3>
          </div>
        </header>
        <AccountLogin v-show="isLogin" @onClose="closeAccount"></AccountLogin>
        <AccountRegister v-show="!isLogin" @onClose="closeAccount"></AccountRegister>
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
import AccountLogin from './AccountLogin'
import AccountRegister from './AccountRegister'
export default {
  components: {
    AccountLogin,
    AccountRegister
  },

  props: {
    value: Boolean,
  },

  data() {
    return {
      dialog: false,

      email: '',
      password: '',
      isLogin: true
    }
  },

  created() {
    this.dialog = this.value
  },

  watch: {
    value(v) {
      this.dialog = v
      this.$emit('input', v)
    },

    dialog(v) {
      this.$emit('input', v)
    }
  },

  methods: {
    closeAccount() {
      this.dialog = false
    }
  }
}
</script>
<style lang="scss">
.account-card {
  .back-header {
    padding: 12px 6px 0;
  }
  .account-box {
    padding: 16px 28px 44px;
    .top {
      h3 {
        color: #999;
      }
    }
  }
}
</style>
