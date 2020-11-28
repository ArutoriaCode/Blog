const { SUCCESS } = require("~/config/codes")
const { REFRESH_ACCESS_TOKEN, ACCESS_TOKEN, USER_INFO } = require("~/config/keys")

function refreshTokenFail(ctx) {
  ctx.$cookies.remove(ACCESS_TOKEN)
  ctx.$cookies.remove(REFRESH_ACCESS_TOKEN)
  ctx.$cookies.remove(USER_INFO)

  ctx.$alert.error('登录过期了，请重新登录吧!')
  setTimeout(() => {
    if (ctx.route.path === '/') {
      window.location.reload()
      return
    }

    ctx.store.$router.replace('/')
  }, 3000)
}

export default async (_response, ctx) => {
  // 先判断刷新令牌是否存在
  const refresh_token = ctx.$cookies.get(REFRESH_ACCESS_TOKEN)
  if (!refresh_token) {
    refreshTokenFail(ctx)
    return
  }

  return ctx.$api
    .post('/user/refresh', {
      token: refresh_token,
    })
    .then((rsp) => {
      if (rsp.code !== SUCCESS) {
        return Promise.reject(rsp)
      }

      const { user, token } = rsp.data
      ctx.$cookies.set(ACCESS_TOKEN, token.access_token)
      ctx.$cookies.set(REFRESH_ACCESS_TOKEN, token.refresh_token)
      ctx.$cookies.set(USER_INFO, user)

      // 这里拿取的是access_token失效时的请求配置 create -> token失效 -> refresh -> create
      const { url, method, data } = _response.config
      return ctx.$api({ url, method, data })
    })
    .catch((err) => {
      console.error('刷新令牌失败：', err)
      ctx.$alert.error('登录过期了，请重新登录吧!')
      refreshTokenFail(ctx)
    })
}
