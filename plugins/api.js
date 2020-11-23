const dev = process.env.NODE_ENV !== 'production'

export default ({ $axios }, inject) => {
  const api = $axios.create()

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

    if (typeof response.data === 'object') {
      return response.data
    }

    if (response.headers['content-type'].includes('application/json')) {
      if (typeof response.data === 'string') {
        try {
          return JSON.parse(response.data)
        } catch (err) {
          
        }
      }
    }
  })

  inject('api', api)
}
