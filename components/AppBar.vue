<template>
  <div class="AppBar">
    <LeftNavigation v-model="showLeftNavigation"></LeftNavigation>
    <v-app-bar app fixed flat>
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
      <div class="toolbar-right-content align-center">
        <template v-if="isPost">
          <v-btn class="px-2" depressed text small>
            <v-icon> mdi-heart </v-icon>
            <span class="pl-1 body-2">{{ heart }}</span>
          </v-btn>
          <v-btn
            class="px-2"
            depressed
            text
            small
            @click.stop="onScrollToComment"
          >
            <v-icon> mdi-message-processing </v-icon>
            <span class="pl-1 body-2">{{ comment }}</span>
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
            {{ $vuetify.theme.dark ? 'mdi-brightness-4' : 'mdi-brightness-6' }}
          </v-icon>
        </v-btn>
        <v-btn
          :class="_mobileHideClass"
          depressed
          color="saber"
          @click.stop="showAccount"
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
      <!-- Right End -->
    </v-app-bar>
  </div>
</template>
<script>
import Tabs from './Tabs'
import LeftNavigation from './LeftNavigation'
export default {
  components: {
    Tabs,
    LeftNavigation,
  },

  data() {
    return {
      title: 'Arutoria',
      showLeftNavigation: false
    }
  },

  inject: {
    showAccount: {
      type: Function
    }
  },

  computed: {
    _mobileHideClass() {
      return 'd-none d-xl-flex d-lg-flex ma-1'
    },

    isPost() {
      return this.$nuxt.$route.name === 'post-id'
    },

    heart() {
      if (!this.isPost) {
        return 0
      }

      const id = this.$route.params.id
      return this.$store.state.posts[id].heart || 0
    },

    comment() {
      if (!this.isPost) {
        return 0
      }

      const id = this.$route.params.id
      return this.$store.state.posts[id].comment || 0
    }
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