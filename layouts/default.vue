<template>
  <v-app :class="_AppClass">
    <LeftNavigation v-model="showLeftNavigation"></LeftNavigation>
    <v-app-bar app fixed flat>
      <v-toolbar-title class="toolbar-title" v-text="title" />
      <v-spacer />
      <Tabs :class="_mobileHideClass" style="width: 278px"></Tabs>
      <v-spacer />
      <div class="toolbar-right-content">
        <v-btn
          :class="_mobileHideClass"
          depressed
          text
          @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark"
        >
          <v-icon>
            {{ $vuetify.theme.dark ? 'mdi-brightness-4' : 'mdi-brightness-6' }}
          </v-icon>
        </v-btn>
        <v-btn :class="_mobileHideClass" depressed color="saber"> 登录 </v-btn>
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
    </v-app-bar>
    <v-main>
      <div
        :class="{ 'd-flex': $nuxt.isOffline }"
        class="flex-column justify-center align-center"
        style="height: 100%;"
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
import LeftNavigation from '../components/LeftNavigation'
import Footer from '../components/Footer'
import Tabs from '../components/Tabs'
import offline from '../static/images/offline.png'
export default {
  components: {
    LeftNavigation,
    Tabs,
    Footer,
  },

  data() {
    return {
      title: 'Arutoria',
      showLeftNavigation: false,
      offline
    }
  },

  computed: {
    _AppClass() {
      return {
        pc: !this.$vuetify.breakpoint.mobile,
        mobile: this.$vuetify.breakpoint.mobile,
      }
    },

    _mobileHideClass() {
      return 'd-none d-xl-flex d-lg-flex ma-2'
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
