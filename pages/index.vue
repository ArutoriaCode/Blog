<template>
  <v-row class="pageIndex">
    <TopCarousel></TopCarousel>
    <v-col cols="12">
      <v-row>
        <ArticleList>
          <ArticleCard></ArticleCard>
        </ArticleList>
        <Tags></Tags>
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
    Tags
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
