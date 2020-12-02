<template>
  <v-form class="main-form" ref="registerForm" lazy-validation>
    <div class="flex xs12 sm12">
      <div class="form-field input-required">
        <label>邮箱</label>
        <v-text-field
          :rules="emailRules"
          v-model="email"
          filled
          rounded
          dense
          required
        />
      </div>
    </div>
    <div class="flex xs12 sm12">
      <div class="form-field input-required">
        <label>密码</label>
        <v-text-field
          :type="!hidePassowrd ? 'text' : 'password'"
          filled
          rounded
          dense
          :rules="passwordRules"
          v-model="password"
        >
          <template slot="append-outer">
            <v-btn
              small
              rounded
              text
              @click.stop="hidePassowrd = !hidePassowrd"
            >
              <v-icon size="20px" v-if="!hidePassowrd">mdi-eye</v-icon>
              <v-icon size="20px" v-else>mdi-eye-off</v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </div>
    </div>
    <div class="flex xs12 sm12">
      <div class="form-field input-required">
        <label>昵称</label>
        <v-text-field
          v-model="username"
          :rules="usernameRules"
          filled
          rounded
          dense
        />
      </div>
    </div>
    <div class="flex xs12 sm12">
      <div class="form-field input-required avatar-upload">
        <label>头像</label>
        <v-file-input accept=".png,.jpg" v-model="avatar" :rules="avatarRules" filled rounded dense />
      </div>
    </div>
    <div class="flex xs12 sm12 text-center">
      <v-btn
        large
        class="next-btn"
        elevation="0"
        @click="onRegister"
        :loading="loading"
        :color="timer ? 'error' : ''"
      >
        <span class="subtitle-2" v-if="timer"
          >操作频繁，请等待 {{ second }} 秒</span
        >
        <span class="subtitle-2" v-show="timer === null">继续</span>
        <v-icon size="18px" class="ml-2" v-show="timer === null"
          >mdi-arrow-right</v-icon
        >
      </v-btn>
    </div>
  </v-form>
</template>
<script>
import intercept from '@/mixins/intercept'
import { emailRules, passwordRules, usernameRules, avatarRules } from './rules'
import { EXIST_USER, REGISTER_SUCCESS, SUCCESS } from '@/config/codes.js'
import { ACCESS_TOKEN, REFRESH_ACCESS_TOKEN, USER_INFO } from '~/config/keys'
export default {
  mixins: [intercept],
  data: () => ({
    hidePassowrd: true,
    emailRules,
    passwordRules,
    usernameRules,
    avatarRules,
    loading: false,

    email: '',
    password: '',
    username: '',
    avatar: null,

    /** 已在intercept定义 */
    // count: 0,
    // second: 10,
    // timer: null
  }),

  methods: {
    onRegister() {
      const allowRegister = this.$refs['registerForm'].validate()
      if (!allowRegister) {
        this.$alert.error('不行不行不行！')
        return
      }

      const isAllow = this.allowPassage()
      if (isAllow === false) {
        return
      }

      this.loading = true
      const formData = new FormData()
      formData.append('email', this.email)
      formData.append('password', this.password)
      formData.append('username', this.username)
      formData.append('file', this.avatar)
      this.$api
        .post('/user/register', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((rsp) => {
          this.loading = false
          if (rsp.code !== REGISTER_SUCCESS) {
            return Promise.reject()
          }

          const { token, user } = rsp.data
          this.$cookies.set(ACCESS_TOKEN, token.access_token)
          this.$cookies.set(REFRESH_ACCESS_TOKEN, token.refresh_token)
          this.$cookies.set(USER_INFO, user)
          this.$emit('onCloseAccount')
        })
    },
  },
}
</script>
<style lang="scss">
.main-form {
  margin-top: 30px;
  .next-btn {
    width: 240px;
    margin: 16px auto 0;
  }
  .form-field .v-text-field input {
    width: 100%;
    border: 1px solid transparent;
    font-size: 14px;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 24px;
    box-sizing: border-box;
    height: 40px;
    padding: 10px 16px !important;
    outline: none;
    border-radius: 8px;
    -webkit-transition: background-color 0.2s ease, outline 0.2s ease,
      color 0.2s ease, box-shadow 0.2s ease;
    transition: background-color 0.2s ease, outline 0.2s ease, color 0.2s ease,
      box-shadow 0.2s ease;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    color: #0d0c22;
    background-color: #f3f3f4;
    max-height: inherit;
  }
  .form-field.input-required {
    label {
      padding-left: 8px;
      display: block;
      font-weight: 700;
      margin: 14px 0 6px;
      color: #0d0c22;
      &::after {
        content: '*';
        color: red;
        margin-left: 4px;
      }
    }
    .v-input__slot {
      padding: 0;
    }
    .v-input__append-inner {
      padding-right: 10px;
    }
    .v-file-input__text {
      padding-left: 14px;
    }
    .avatar-upload {
      .v-input__slot {
        cursor: pointer;
      }
    }
  }
  .form-field .v-text-field input:hover {
    background-color: #fff;
    border-color: rgba(4, 120, 190, 0.4);
    box-shadow: 0 0 0 4px rgba(4, 120, 190, 0.1);
  }
  .form-field .v-input__append-outer {
    margin-top: 6px !important;
  }
}
</style>
