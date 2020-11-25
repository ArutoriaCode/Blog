import validate from "~/utils/validate";

export const emailRules = [
  v => !!v || '必填项',
  v => validate.isEmail(v) || '请输入有效的邮箱地址'
]

export const passwordRules = [
  v => !!v || '必填项',
  v => (v && v.length >= 8 && v.length <= 30) || '密码不能小于8位且不能大于30位'
]


export const usernameRules = [
  v => !!v || '必填项',
  v => (v && v.length >= 2 && v.length <= 16) || '昵称长度不能小于2字符且不能大于16字符'
]
