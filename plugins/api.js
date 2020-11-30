import Vue from 'vue'
import VueCookies from 'vue-cookies'
import clientHandlerException from '~/utils/clientHandlerException'
import clientHandlerError from '~/utils/clientHandlerError'
import { ACCESS_TOKEN } from '~/config/keys'
const dev = process.env.NODE_ENV !== 'production'

Vue.use(VueCookies)

function reponseDataToJson(response) {
  let data = {}

  if (typeof response.data === 'object') {
    data = response.data
  }

  if (response.headers['content-type'].includes('application/json')) {
    if (typeof response.data === 'string') {
      try {
        data = JSON.parse(response.data)
      } catch (err) {}
    }
  }

  return data
}

export default (ctx, inject) => {
  const api = ctx.$axios.create()
  api.setBaseURL(
    dev ? 'http://192.168.1.125:6140/api/v1/' : 'http://arutoria.com/api/v1/'
    // dev ? 'http://192.168.124.3:6140/api/v1/' : 'http://arutoria.com/api/v1/'
  )

  api.setHeader('Content-Type', 'application/json', ['post'])
  ctx.notAuthRequest = null
  ctx.$cookies = Vue.$cookies
  api.onRequest(config => {
    if (!process.client) {
      return config
    }

    const access_token = ctx.$cookies.get(ACCESS_TOKEN)
    if (access_token) {
      api.setToken(access_token, 'Bearer')
    }

    if (dev) {
      console.log('clinet request config ->', config)
    }
  })

  api.onResponse(async (response) => {
    const data = reponseDataToJson(response)
    if (dev) {
      console.log('clinet response ->', data)
    }

    const { url, method } = response.config
    const isRefreshToken = url === '/refresh' && method === 'post'
    const isGetAllLike = url === '/like/all' && method === 'get'
    if (process.client && !isRefreshToken && !isGetAllLike) {
      // 把本次请求的参数配置存储
      const _response = { ...response, data }
      const result = await clientHandlerException(_response, ctx)
      if (!!result) {
        console.warn('【重新请求】', result)
        return result
      }
    }

    return data
  })

  api.onResponseError(async (err) => {
    const { url, method } = err.config
    const data = reponseDataToJson(err.response)
    const response = { data, config: err.config }
    const isRefreshToken = url === '/refresh' && method === 'post'
    if (process.client && !isRefreshToken) {
      await clientHandlerError(response, ctx)
      return response.data
    }
    
    const isGetAllLike = url === '/like/all' && method === 'get'
    if (isGetAllLike) {
      return response.data
    }
  })

  inject('api', api)
}
