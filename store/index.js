export const state = () => ({
  posts: {}, // 文章缓存，第一次请求后会存储在这里，重复打开时将直接从这里取出。
})

export const mutations = {
  setPostCache(state, post) {
    let isExist = !!state.posts[post.id]
    if (isExist) {
      return
    }

    let postList = Object.keys(state.posts)
    if (postList.length >= 10) {
      const reKey = postList.shift()
      delete state.posts[reKey]
    }
    if (postList.length === 0) {
      state.posts[post.id] = post
    }

    state.posts = { ...state.posts }
  },
}
