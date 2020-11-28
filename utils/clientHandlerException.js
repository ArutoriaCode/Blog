import {
  EXIST_USER,
  LOGIN_SUCEESS,
  REGISTER_SUCCESS,
  INVALID_OR_EXPIRED_TOKEN,
  INVALID_TOKEN,
  NOT_EXIST_USER_OR_PASSWORD_ERROR
} from '../config/codes'

const checkAndGetNewToken = require('./checkAndGetNewToken')

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
    case INVALID_OR_EXPIRED_TOKEN:
      return await checkAndGetNewToken(_response, ctx)
    case INVALID_TOKEN:
      return await checkAndGetNewToken(_response, ctx)
    default:
      return
  }
}
