export { default as ArticlesCard } from '../..\\components\\ArticlesCard.vue'
export { default as ArticlesList } from '../..\\components\\ArticlesList.vue'
export { default as LeftNavigation } from '../..\\components\\LeftNavigation.vue'
export { default as Tabs } from '../..\\components\\Tabs.vue'
export { default as Tags } from '../..\\components\\Tags.vue'
export { default as TopCarousel } from '../..\\components\\TopCarousel.vue'

export const LazyArticlesCard = import('../..\\components\\ArticlesCard.vue' /* webpackChunkName: "components_ArticlesCard" */).then(c => c.default || c)
export const LazyArticlesList = import('../..\\components\\ArticlesList.vue' /* webpackChunkName: "components_ArticlesList" */).then(c => c.default || c)
export const LazyLeftNavigation = import('../..\\components\\LeftNavigation.vue' /* webpackChunkName: "components_LeftNavigation" */).then(c => c.default || c)
export const LazyTabs = import('../..\\components\\Tabs.vue' /* webpackChunkName: "components_Tabs" */).then(c => c.default || c)
export const LazyTags = import('../..\\components\\Tags.vue' /* webpackChunkName: "components_Tags" */).then(c => c.default || c)
export const LazyTopCarousel = import('../..\\components\\TopCarousel.vue' /* webpackChunkName: "components_TopCarousel" */).then(c => c.default || c)
