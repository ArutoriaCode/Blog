<template>
  <v-row class="pageIndex">
    <TopCarousel></TopCarousel>
    <v-col cols="12">
      <v-row>
        <ArticleList :class="_ArticleListClass">
          <div
              :class="_ArticleCardClass"
              style="height: 100%"
              v-show="hasError"
            >
              <v-img width="280" contain :src="require('~/static/images/error.png')"></v-img>
              <v-subheader class="error-alert-text font-unineue"
                >好像出错了</v-subheader
              >
            </div>
          <div v-show="!hasError">
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
      hasError: false
    }
  },

  async asyncData({ $api }) {
    try {
      const posts = await $api.get('/posts')
      return {
        posts: posts.data,
      }
    } catch (error) {
      return {
        posts: [],
        hasError: true,
      }
    }
  },

  computed: {
    _TagsClass() {
      return {
        'mt-10': this.hasError && this.$vuetify.breakpoint.mobile
      }
    },
    _ArticleListClass () {
      return { 'mb-10': this.hasError }
    },
    _ArticleCardClass () {
      return {
        'd-flex': this.hasError,
        'flex-column justify-center align-center': true
      }
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
}
</style>
