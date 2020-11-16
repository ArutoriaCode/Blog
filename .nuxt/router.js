import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _8034b2a0 = () => interopDefault(import('../pages/guestbook.vue' /* webpackChunkName: "pages/guestbook" */))
const _601efdb0 = () => interopDefault(import('../pages/links.vue' /* webpackChunkName: "pages/links" */))
const _00d7b47e = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/guestbook",
    component: _8034b2a0,
    name: "guestbook"
  }, {
    path: "/links",
    component: _601efdb0,
    name: "links"
  }, {
    path: "/",
    component: _00d7b47e,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
