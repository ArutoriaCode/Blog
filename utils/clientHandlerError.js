import { CREDENTIALS_REQUIRED_TOKEN, SERVER_ERROR, PARAMS_ERROR } from '@/config/codes'
/** 一些异常类的status状态码并非是200，所以需要在此处处理axios的ReponseError */
export default async (reponse, ctx) => {
  if (!process.client || !reponse.code) {
    return
  }

  switch (reponse.code) {
    // status: 500
    case SERVER_ERROR:
      ctx.$alert.error('服务器炸了！')
      return
    // status: 401
    case CREDENTIALS_REQUIRED_TOKEN:
      ctx.$alert.error('请先登录！')
      return
    // status: 422
    case PARAMS_ERROR:
      ctx.$alert.error('请求参数有误！')
      return
  }

  
}
