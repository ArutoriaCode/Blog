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
  v => {
    v = v.trim()
    if (v.includes(' ')) {
      return '昵称内不能包含空格'
    }
    return (v.length >= 2 && v.length <= 16) || '昵称不能小于2字符且大于16个字符'
  }
]

export const avatarRules = [
  value => !value || value.size < 3000000 || '头像大小不能大于3MB',
]

export const commentRules = [
  v => !!(v && v.trim()) || '不能全部是空格呀~',
  v => v && v.length < 360 || '字符长度不能大于360个字符'
]
