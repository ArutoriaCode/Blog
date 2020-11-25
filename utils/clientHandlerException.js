import { EXIST_USER, LOGIN_SUCEESS, PARAMS_ERROR } from "./status.js"

/** 客户端下的请求异常处理及提示 */
export default (response, $alert) => {
  if (!process.client) {
    return
  }

  switch (response.code) {
    case LOGIN_SUCEESS:
      $alert.success('登录成功！')
      break;
    case EXIST_USER:
      $alert.error('用户已存在，请勿重复注册')
      break;
    case PARAMS_ERROR:
      $alert.error('请求参数有误！')
      break;
  }
}
