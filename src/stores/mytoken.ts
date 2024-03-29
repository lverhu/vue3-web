import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'

interface Token {
  access_token: string
  token_type: string
  refresh_token: string
  expires_in: number
  user_id: string
}

export const useTokenStore = defineStore('mytoken', () => {
  // ref相当于state
  const tokenJson = ref("")
  // computer相当于getters
  const token = computed<Token>(() => {
    try {
      return JSON.parse(tokenJson.value || window.localStorage.getItem("TokenInfo") || "{}")
    } catch (err) {
      ElMessage.error('json字符串格式不对，转换对象时失败...')
      window.localStorage.setItem("TokenInfo", "")
      throw err
    }
  })

  // function相当于actions
  function saveToken(data: string) {
    // 保存到js中，相当于临时变量，页面刷新会清空
    tokenJson.value = data
    // 保存到浏览器缓存中
    window.localStorage.setItem("TokenInfo", data)
  }
  // 向外暴漏
  return { token, saveToken }
})
