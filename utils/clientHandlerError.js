import { CREDENTIALS_REQUIRED_TOKEN, SERVER_ERROR, PARAMS_ERROR, INVALID_TOKEN, INVALID_OR_EXPIRED_TOKEN } from '@/config/codes'
import checkAndGetNewToken from './checkAndGetNewToken';

function prefixCheckAlert(ctx, msg, config) {
  const { url, method } = config

  // 如果登录过期或没有登录，一些接口的错误信息是不需要提示的
  const isGetAllLike = url === '/like/all' && method === 'get'
  if (isGetAllLike) {
    return
  }

  ctx.$alert.error(msg)
}

/** 一些异常类的status状态码并非是200，所以需要在此处处理axios的ReponseError */
export default async (reponse, ctx) => {
  if (!process.client || !reponse.data.code) {
    return
  }

  switch (reponse.data.code) {
    // status: 500
    case SERVER_ERROR:
      ctx.$alert.error('服务器炸了！')
      return
    // status: 401
    case CREDENTIALS_REQUIRED_TOKEN:
      prefixCheckAlert(ctx, '请先登录！', reponse.config)
      return
    // status: 422
    case PARAMS_ERROR:
      ctx.$alert.error('请求参数有误！')
      return
    // status: 401
    case INVALID_OR_EXPIRED_TOKEN:
      return await checkAndGetNewToken(reponse, ctx)
    // status: 401
    case INVALID_TOKEN:
      return await checkAndGetNewToken(reponse, ctx)
    default:
      return
  }
}
