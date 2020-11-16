<template>
  <v-app :class="_AppClass">
    <LeftNavigation v-model="showLeftNavigation"></LeftNavigation>
    <v-app-bar app fixed flat height="56px">
      <v-btn text small @click="$router.back()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-spacer />
      <v-spacer />
      <div class="toolbar-right-content">
        <v-btn
          class="px-2"
          depressed
          text
          small
        >
          <v-icon> mdi-heart </v-icon>
          <span class="pl-1 body-2">0</span>
        </v-btn>
        <v-btn
          class="px-2"
          depressed
          text
          small
          @click.stop="onScrollToComment"
        >
          <v-icon>
            mdi-message-processing
          </v-icon>
          <span class="pl-1 body-2">0</span>
        </v-btn>
        <v-btn
          :class="_mobileHideClass"
          depressed
          text
          small
          @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark"
        >
          <v-icon>
            {{ $vuetify.theme.dark ? 'mdi-brightness-4' : 'mdi-brightness-6' }}
          </v-icon>
        </v-btn>
        <v-btn :class="_mobileHideClass" class="ml-2" depressed color="saber" small>
          登录
        </v-btn>
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
    <v-main class="pa-0">
      <nuxt />
    </v-main>
    <Footer></Footer>
  </v-app>
</template>
<script>
import LeftNavigationVue from '@/components/LeftNavigation.vue'
import Footer from '@/components/Footer.vue'
export default {
  head: {
    titleTemplate: '%s - Arutoria'
  },

  components: {
    LeftNavigationVue,
    Footer
  },

  data: () => ({
    showLeftNavigation: false
  }),

  methods: {
    onScrollToComment() {
      document.getElementById('comments').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
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
      return 'd-none d-xl-flex d-lg-flex px-2'
    }
  },
}
</script>
<style lang="scss">
.toolbar-right-content {
  i.theme--light {
    color: #757575 !important;
  }
  i.theme--dark {
    color: #ffffff !important;
  }
}
</style>