<template>
  <v-row class="pageIndex">
    <TopCarousel></TopCarousel>
    <v-col cols="12">
      <v-row>
        <ArticleList>
          <div
            :class="_ArticleCardClass"
            v-show="hasError"
          >
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
            <div v-if ="isEmpty" :class="_emptyClass">
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
            <ArticleCard
              v-for="post in posts"
              :key="post.id"
              :post="post"
            ></ArticleCard>
          </div>
        </ArticleList>
        <Tags :class="_TagsClass"></Tags>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import TopCarousel from '@/components/TopCarousel'
import ArticleList from '@/components/ArticlesList'
import ArticleCard from '@/components/ArticlesCard'
import Tags from '@/components/Tags'
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
    }
  },

  async asyncData({ $api }) {
    try {
      const posts = await $api.get('/posts')
      return {
        posts: [],
        test: false
      }
    } catch (error) {
      console.error("Get Post Error:", error)
      return {
        posts: [],
        hasError: true,
      }
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

    isEmpty() {
      return this.posts.length === 0
    },

    _emptyClass() {
      return 'd-flex _post-card flex-column justify-center align-center'
    }
  },
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
