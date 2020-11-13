<template>
  <v-app :class="_AppClass">
    <LeftNavigation v-model="showLeftNavigation"></LeftNavigation>
    <v-app-bar app fixed flat>
      <v-toolbar-title class="toolbar-title" v-text="title" />
      <v-spacer />
      <Tabs :class="_mobileHideClass" style="width: 278px;"></Tabs>
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
        <v-btn
          :class="_mobileHideClass"
          depressed
          color="primary"
        >
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
    <v-main>
      <v-container>
        <nuxt class="index-container" />
      </v-container>
    </v-main>
    <v-footer absolute app>
      <div class="site-info">
        <a class="site-item" href="http://arutoria.com"
          >&copy; {{ new Date().getFullYear() }} arutoria.com All Rights
          Reserved.</a
        >
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import LeftNavigation from '../components/LeftNavigation'
import Tabs from '../components/Tabs'
export default {
  components: {
    LeftNavigation,
    Tabs,
  },

  data() {
    return {
      title: 'Arutoria',
      showLeftNavigation: false,
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
    }
  },
}
</script>
