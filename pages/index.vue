<template>
  <div class="index-container">
    <v-row class="pageIndex">
      <TopCarousel></TopCarousel>
      <v-col cols="12">
        <v-row>
          <ArticleList>
            <div :class="_ArticleCardClass" v-show="hasError">
              <v-img
                width="280"
                height="280"
                contain
                :src="require('~/static/images/error.png')"
              ></v-img>
              <v-subheader class="error-alert-text font-unineue mt-2"
                >GET POSTS ERROR</v-subheader
              >
            </div>
            <div v-show="!hasError">
              <div v-if="isEmptyPost" class="d-flex _post-card flex-column justify-center align-center">
                <v-img
                  width="280"
                  height="280"
                  contain
                  :src="require('~/static/images/empty.png')"
                ></v-img>
                <v-subheader class="error-alert-text font-unineue mt-2"
                  >EMPTY DATA</v-subheader
                >
              </div>
              <ArticleCard v-for="post in posts" :key="post.id" :post="post" />
              <div class="loadingMore" v-if="!noMoreData">
                <v-btn small rounded :loading="loading" @click="loadMorePosts">加载更多</v-btn>
              </div>
            </div>
          </ArticleList>
          <Tags :class="_TagsClass"></Tags>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TopCarousel from '@/components/TopCarousel'
import ArticleList from '@/components/ArticlesList'
import ArticleCard from '@/components/ArticlesCard'
import Tags from '@/components/Tags'
import isEmpty from 'lodash/isEmpty'
import { USER_INFO } from '~/config/keys'
import { SUCCESS } from '~/config/codes'
export default {
  components: {
    TopCarousel,
    ArticleList,
    ArticleCard,
    Tags,
  },

  data() {
    return {
      hasError: false,
      current: 1,
      pageSize: 0,
      loading: false
    }
  },

  beforeMount() {
    const user = this.$cookies.get(USER_INFO)
    if (user && user.id) {
      this.$store.commit('setUserInfo', user)
    }
  },

  async asyncData({ $api }) {
    const result = {
      posts: [],
      hasError: false,
      current: 1,
      pageSize: 0
    }

    try {
      const rsp = await $api.get('/posts')
      const { data, current, pageSize } = rsp
      result.posts = data
      result.current = current
      result.pageSize = pageSize
    } catch (error) {
      console.error('Get Post Error:', error)
    } finally {
      return result
    }
  },

  computed: {
    _TagsClass() {
      return {
        'mt-10': this.hasError && this.$vuetify.breakpoint.mobile,
      }
    },

    _ArticleCardClass() {
      return {
        'd-flex': this.hasError,
        '_post-card flex-column justify-center align-center': true,
      }
    },

    isEmptyPost() {
      return isEmpty(this.posts)
    },

    noMoreData() {
      return this.current >= this.pageSize
    }
  },

  methods: {
    loadMorePosts() {
      if (this.loading) {
        return
      }

      this.loading = true
      this.$api.get(`/posts?current=${this.current}&limit=5`).then(rsp => {
        this.loading = false
        if (rsp.code !== SUCCESS) {
          this.$alert.error('加载失败！')
          return
        }

        if (rsp.data instanceof Array && rsp.data.length > 0) {
          this.posts.push(...rsp.data)
        }

        const { current, pageSize } = rsp
        this.pageSize = pageSize
        this.current = current + 1
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss">
.pageIndex {
  .flex-middle-between {
    .v-subheader {
      font-size: 20px;
      font-size: 1.25rem;
      padding-left: 0;
    }
  }
  .tags {
    .v-subheader {
      font-size: 20px;
      font-size: 1.25rem;
      padding-left: 0;
    }
  }

  ._post-card {
    max-height: 500px;
  }
}
</style>
