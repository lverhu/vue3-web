import request from "@/utils/request"

type Common<T> = {
    code: string
    data: T
    mesg: string
    time: string
}

export type Resource = {
    categoryId: number
    createdBy: string
    createdTime: string
    description: string
    id: number
    name: string
    operatorId: number | null
    selected: boolean
    sort: number
    updatedBy: string
    updatedTime: string
    url: string
}

export type QueriedResult = {
    current: number
    hitCount?: false
    optimizeCountSql?: boolean
    orders?: any[]
    pages?: number
    records: Resource[] | []
    searchCount?: boolean
    size: number
    total: number
}

export type Condition = Partial<{
    id: number
    name: string
    startCreateTime: string
    url: string
    categoryId: number | ""
    endCreateTime: string
    current: number
    size: number
}>

// 安条件分页查看资源
export const getResourcePages = (condition: Condition) => {
    return request<Common<QueriedResult>>({
        method: 'POST',
        url: "/boss/resource/getResourcePages",
        data: condition,
    })
}

// 保存或者更新资源
export const saveOrUpdate = (resource: Partial<Resource>) => {
    return request<Common<boolean>>({
        method: 'POST',
        url: "/boss/resource/saveOrUpdate",
        data: resource
    })
}

// 删除指定id的资源
export const deleteResource = (id: number) => {
    return request<Common<boolean>>({
        method: 'DELETE',
        url: `/boss/resource/${id}`
    })
}

// 根据指定id获取资源信息
export const getResourceById = (id: number) => {
    return request<Common<Resource>>({
        method: "GET",
        url: `/boss/resource/${id}`,
    })
}