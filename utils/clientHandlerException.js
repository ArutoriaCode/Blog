import { ACCESS_TOKEN, REFRESH_ACCESS_TOKEN, USER_INFO } from '~/config/keys'
import {
  EXIST_USER,
  LOGIN_SUCEESS,
  PARAMS_ERROR,
  SUCCESS,
  REGISTER_SUCCESS,
  INVALID_OR_EXPIRED_TOKEN,
  INVALID_TOKEN,
  NOT_EXIST_USER_OR_PASSWORD_ERROR,
  SERVER_ERROR
} from '../config/codes'

async function checkAndGetNewToken(_response, ctx) {
  // 先判断刷新令牌是否存在
  const refresh_token = ctx.$cookies.get(REFRESH_ACCESS_TOKEN)
  if (!refresh_token) {
    return
  }

  return ctx.$api
    .post('/refresh', {
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
      ctx.$cookies.remove(ACCESS_TOKEN)
      ctx.$cookies.remove(REFRESH_ACCESS_TOKEN)
      ctx.$cookies.remove(USER_INFO, user)

      ctx.$alert.error('登录过期了，请重新登录吧!')
      setTimeout(() => {
        ctx.$router.replace('/')
      }, 3000)
    })
}

/** 客户端下的请求异常处理及提示
 * @param _response 存储着本次请求和响应的信息
 */
export default async (_response, ctx) => {
  if (!process.client) {
    return
  }

  const { code } = _response.data
  switch (code) {
    case LOGIN_SUCEESS:
      ctx.$alert.success('登录成功！')
      return
    case EXIST_USER:
      ctx.$alert.error('用户已存在，请勿重复注册')
      return
    case NOT_EXIST_USER_OR_PASSWORD_ERROR:
      ctx.$alert.error('用户不存在或密码输入错误')
      return
    case REGISTER_SUCCESS:
      ctx.$alert.success('注册成功，将为你自动登录')
      return
    case PARAMS_ERROR:
      ctx.$alert.error('请求参数有误！')
      return
    case SERVER_ERROR:
      ctx.$alert.error('服务器炸了！')
      return
    case INVALID_OR_EXPIRED_TOKEN:
      return await checkAndGetNewToken(_response, ctx)
    case INVALID_TOKEN:
      return await checkAndGetNewToken(_response, ctx)
    default:
      return
  }
}
