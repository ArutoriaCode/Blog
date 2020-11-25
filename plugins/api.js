import clientHandlerException from "~/utils/clientHandlerException"

const dev = process.env.NODE_ENV !== 'production'

export default (ctx, inject) => {
  const api = ctx.$axios.create()

  api.setBaseURL(
    dev ? 'http://192.168.1.125:6140/api/v1/' : 'http://arutoria.com/api/v1/'
  )

  api.setHeader('Content-Type', 'application/json', ['post'])

  api.onResponse((response) => {
    if (response.data && response.data.code === 6666) {
      // 设置Token
      api.setToken(response.data.data, 'Bearer', ['post'])
      window.localStorage.setItem('token')
    }

    let data = {}

    if (typeof response.data === 'object') {
      data = response.data
    }

    if (response.headers['content-type'].includes('application/json')) {
      if (typeof response.data === 'string') {
        try {
          data = JSON.parse(response.data)
        } catch (err) {
          
        }
      }
    }

    if (process.client) {
      clientHandlerException(data, ctx.$alert)
    }

    return data
  })

  inject('api', api)
}
