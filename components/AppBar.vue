<template>
  <div class="AppBar">
    <LeftNavigation v-model="showLeftNavigation"></LeftNavigation>
    <v-app-bar app fixed flat height="56px">
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
            {{ $vuetify.theme.dark ? 'mdi-brightness-5' : 'mdi-brightness-2' }}
          </v-icon>
        </v-btn>
        <v-btn
          :class="_mobileHideClass"
          depressed
          color="saber"
          @click.stop="showAccount"
          v-if="!authority"
        >
          登录
        </v-btn>
        <v-menu :class="_mobileHideClass" close-on-click offset-y v-else>
          <template v-slot:activator="{ on, attrs }">
            <v-avatar size="36" v-bind="attrs" v-on="on">
              <v-img
                :src="avatar || require('~/static/images/Delta.jpg')"
                alt=""
              />
            </v-avatar>
          </template>

          <v-list class="_menu_list" dense>
            <v-list-item link>
              <v-icon size="20">mdi-cog</v-icon>
              设置
            </v-list-item>
            <v-list-item link>
              <v-icon size="20">mdi-exit-to-app</v-icon>
              退出
            </v-list-item>
          </v-list>
        </v-menu>
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
import { mapGetters } from 'vuex'

export default {
  components: {
    Tabs,
    LeftNavigation,
  },

  data() {
    return {
      title: 'Arutoria',
      showLeftNavigation: false,
    }
  },

  inject: {
    showAccount: {
      type: Function,
    },
  },

  computed: {
    ...mapGetters(['authority', 'avatar']),

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
    },
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
.v-list._menu_list {
  .v-list-item .v-icon {
    margin-right: 8px;
  }
}
</style>
