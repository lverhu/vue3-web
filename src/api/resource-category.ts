import request from "@/utils/request";

type Common<T> = {
    code: string
    data: T
    mesg: string
    time: string
}

export type ResourceCategory = {
    createdBy: string
    createdTime: string
    id: number
    name: string
    operatorId: number | null
    selected: boolean
    sort: number
    updatedBy: string
    updatedTime: string
}

// 获取所有资源类别信息
export const getAll = () => {
    return request<Common<ResourceCategory[]>>({
        method: 'GET',
        url: '/boss/resource/category/getAll',
    })
}
