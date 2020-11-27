import VueCookies from 'vue-cookies/vue-cookies'
import { ACCESS_TOKEN, REFRESH_ACCESS_TOKEN, USER_INFO } from '~/config/keys'

export default function () {
  VueCookies.remove(ACCESS_TOKEN)
  VueCookies.remove(REFRESH_ACCESS_TOKEN)
  VueCookies.remove(USER_INFO)

  if (this.$store) {
    this.$store.commit('setUserInfo', {})
  }

  if (this.$alert) {
    this.$alert.success('你已退出！3秒后刷新')
    setTimeout(() => {
      window.location.reload()
    }, 3000)
  }
}
