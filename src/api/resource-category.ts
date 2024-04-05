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

type ResourceCategoryParams = Pick<ResourceCategory, 'name' | 'sort'> & { id?: number }

//保存或更新资源分类
export const saveOrderUpdate = (ResourceCategoryInfo: ResourceCategoryParams) => {
    return request<Common<boolean>>({
        method: 'POST',
        url: '/boss/resource/category/saveOrderUpdate',
        data: ResourceCategoryInfo,
    })
}

// 删除资源类别
export const deleteCategory = (id: number) => {
    return request<Common<boolean>>({
        method: 'DELETE',
        url: `/boss/resource/category/${id}`
    })
}

