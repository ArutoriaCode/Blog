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
      <v-container v-show="!$nuxt.isOffline">
        <nuxt class="index-container" />
      </v-container>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Account from '~/components/Account/Account.vue'
import AppBar from '~/components/AppBar.vue'
import Footer from '../components/Footer'
import offline from '../static/images/offline.png'

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

  provide() {
    return {
      showAccount: this.showAccount,
    }
  },

  computed: {
    _AppClass() {
      return {
        pc: !this.$vuetify.breakpoint.mobile,
        mobile: this.$vuetify.breakpoint.mobile,
      }
    },
  },

  methods: {
    showAccount() {
      this.show = true
    },
  },
}
</script>
<style lang="scss">
.error-alert-text {
  font-size: 30px;
  font-size: 2rem;
}
</style>
