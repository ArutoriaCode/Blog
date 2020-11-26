/** 操作失败 */
const FAIL = 333;
/** 操作成功 */
const SUCCESS = 666;
/** 参数错误 */
const PARAMS_ERROR = 1422;
/** 服务器错误 */
const SERVER_ERROR = 1500;
/** 登录成功 */
const LOGIN_SUCEESS = 6000;
/** 该用户已存在 */
const EXIST_USER = 6001;
/** 注册成功并会返回token */
const REGISTER_SUCCESS = 6100;
/** 令牌无效或过期 */
const INVALID_OR_EXPIRED_TOKEN = 7000;
/** 无效的令牌 */
const INVALID_TOKEN = 7100;
/** 过期的令牌 */
const EXPIRED_TOKEN = 7101;
/** 吊销的令牌 */
const REVOKED_TOKEN = 7102;
/** 请求头令牌方案不正确 */
const CREDENTIALS_BAD_SCHEME = 7300;
/** 请求头令牌方案的格式不正确 */
const CREDENTAILS_BAD_FORMAT = 7301;
/** 请求头没有携带令牌信息 */
const CREDENTIALS_REQUIRED_TOKEN = 7302;

export {
  FAIL,
  SUCCESS,
  PARAMS_ERROR,
  SERVER_ERROR,
  LOGIN_SUCEESS,
  EXIST_USER,
  REGISTER_SUCCESS,
  INVALID_OR_EXPIRED_TOKEN,
  INVALID_TOKEN,
  EXPIRED_TOKEN,
  REVOKED_TOKEN,
  CREDENTIALS_BAD_SCHEME,
  CREDENTAILS_BAD_FORMAT,
  CREDENTIALS_REQUIRED_TOKEN
}
