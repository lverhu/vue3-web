import request from "@/utils/request";

// 定义类型
type Common<T> = {
    code: string
    data: T
    mesg: string
    time: string
}

export type MenuItem = {
    createdBy: string
    createTime: string
    description: string
    href: string
    icon: string
    id: number
    level: number
    name: string
    operatorId: number | null
    orderNum: number
    parentId: number
    shown: boolean
    updatedBy: string
    updatedTime: string
}

//获取所有菜单项
export const getAll = () => {
    return request<Common<MenuItem[]>>({
        method: 'GET',
        url: '/boss/menu/getAll'
    })
}

//部分？
// type CreateOrEditMenu = Partial<MenuItem>
//挑选，要什么
type CreateOrEditMenu = Pick<
    MenuItem,
    "id" | "parentId" | "name" | "href" | "icon" | "orderNum" | "description" | "shown"
> & { id?: number }
//剔除什么
// type CreateOrEditMenu = Omit<
//     MenuItem,
//     "createdBy" | "createTime" | "level" | "operatoreId" | "updateBy" | "updatedTime"
// > & { id?: number }
// 保存或更新菜单
export const saveOrUpdate = (menuInfo: CreateOrEditMenu) => {
    return request({
        method: 'POST',
        url: '/boss/menu/saveOrUpdate',
        data: menuInfo
    })
}