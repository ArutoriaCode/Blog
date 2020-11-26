import validate from '~/utils/validate'

export const state = () => ({
  user: {},
  posts: {}, // 文章缓存，第一次请求后会存储在这里，重复打开时将直接从这里取出。
})

export const getters = {
  authority(state) {
    return state.user.id && state.user.email
  },

  username(state) {
    if (state.user.username) {
      return state.user.username
    }

    return 'Arutoria'
  },

  avatar(state) {
    if (state.user.avatar && validate.isUrl(state.user.avatar)) {
      return state.user.avatar
    }

    return null
  },
}

export const mutations = {
  setUserInfo(state, user) {
    state.user = user
  },

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
