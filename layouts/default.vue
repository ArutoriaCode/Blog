<template>
  <v-app :class="_AppClass">
    <Alert ref="alert"></Alert>
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
      <v-container v-show="!$nuxt.isOffline">
        <nuxt class="index-container" />
      </v-container>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Account from '~/components/Account/Account.vue';
import AppBar from '~/components/AppBar.vue'
import Footer from '../components/Footer'
import offline from '../static/images/offline.png'
import Alert from '@/components/Alert';

export default {
  components: {
    Account,
    AppBar,
    Footer,
    Alert
  },

  data() {
    return {
      title: 'Arutoria',
      show: false
    }
  },

  provide() {
    return {
      showAccount: this.showAccount,
      $alert: {
        show: (options) => this.showAlert('info', options),
        success: (options) => this.showAlert('success', options),
        error: (options) => this.showAlert('error', options),
        info: (options) => this.showAlert('info', options),
        warn: (options) => this.showAlert('warn', options),
      }
    }
  },

  computed: {
    _AppClass() {
      return {
        pc: !this.$vuetify.breakpoint.mobile,
        mobile: this.$vuetify.breakpoint.mobile,
      }
    }
  },

  methods: {
    showAccount() {
      this.show = true
    },

    showAlert(type, options) {
      this.$refs.alert[type](options)
    }
  }
}
</script>
<style lang="scss">
.error-alert-text {
  font-size: 30px;
  font-size: 2rem;
}
</style>
