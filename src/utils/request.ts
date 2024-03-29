import axios, { type AxiosRequestHeaders } from "axios";
import { useTokenStore } from "@/stores/mytoken";
import { refreshToken } from "@/api/users";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

// 不能在回调中声明
const router = useRouter()

const request = axios.create({
    // baseURL: import.meta.env.VITE_API_URL,
    baseURL: "https://ff9a7eeb-54b2-40d6-9736-a5ece6acfecc.mock.pstmn.io/",
})

// 请求拦截器
request.interceptors.request.use((config) => {
    if (!config.headers) {
        config.headers = {} as AxiosRequestHeaders
    }

    const store = useTokenStore()
    config.headers.Authorization = store.token?.access_token
    return config
})

// 响应拦截器
// use(成功回调,失败回调)

request.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response.status == 401) {
            // 刷新token
            const { data } = await refreshToken()
            if (data.success) {
                //保存新token
                useTokenStore().saveToken(data.content)
                // 重新请求之前到接口，并且把结果返回
                return request(error.config)
            } else {
                // 如果失败，跳转到login
                ElMessage.error("刷新token失败，需要重新登陆")
                router.push({ name: "login" })
                return
            }
        }
        return Promise.reject(error)
    })

export default request