import request from "./request";
import { useTokenStore } from "@/stores/mytoken";

// 用户登陆-参数类型
type LoginInfo = {
    phone: string
    code?: string
    password: string
}

// 提取公共到类型
type CommonReturn<T = string> = {
    success: boolean
    state: number
    message: string
    content: T
}

// 用户登陆-返回数据类型
type LoginResult = CommonReturn
// type LoginResult = CommonReturn<string>
// type LoginResult = {
//     success: boolean
//     state: number
//     message: string
//     content: string
// }

// 用户登陆请求
export const login = (loginInfo: LoginInfo) => {
    return request<LoginResult>({
        method: 'POST',
        url: '/user/login',
        // data: `phone=${loginInfo.phone}&password=${loginInfo.password}`,
        data: loginInfo,
    })
}

/*
    要求请求类型 application/x-www.form-urlencoded
        需要把数据拼接为 data: `属性1=值1&属性2=值2`
    要求请求类型 application/json
        只需要直接传对象 data: loginInfo
*/

type UserInfo = CommonReturn<{
    isUpdatedPassword: boolean
    portrait: string
    userName: string
}>
// type UserInfo = {
//     success: boolean
//     state: number
//     message: string
//     content: {
//         isUpdatedPassword: boolean
//         portrait: string
//         userName: string
//     }
// }

//获取用户信息
export const getInfo = () => {
    return request<UserInfo>({
        method: 'GET',
        url: '/user/getInfo',
    })
}

// 用户退出
export const logout = () => {
    return request({
        method: 'POST',
        url: 'user/logout',
    })
}

// 刷新token
type RToken = CommonReturn<string>
// type RToken = {
//     message: string
//     state: number
//     success: boolean
//     content: string
// }

let promiseRT: Promise<any>
//token重复刷新处理
let isRefreshing = false
export const refreshToken = () => {
    if (isRefreshing) {
        return promiseRT
    }
    isRefreshing = true
    promiseRT = request<RToken>({
        method: 'POST',
        url: 'user/refresh_token',
        params: {
            refreshToken: useTokenStore().token?.refresh_token,
        },
    }).finally(() => {
        isRefreshing = false
    })
    return promiseRT
}
