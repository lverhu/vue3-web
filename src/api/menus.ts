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
export type CreateOrEditMenu = Pick<
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
    return request<Common<boolean>>({
        method: 'POST',
        url: '/boss/menu/saveOrUpdate',
        data: menuInfo
    })
}

// 删除菜单
export const deleteMenu = (id: number) => {
    console.log(id)
    return request<Common<boolean>>({
        method: 'DELETE',
        url: `/boss/menu/${id}`,
    })
}

type SubMenuList = MenuItem & {
    subMenuList: SubMenuList[] | null
}

type EditMenuInfo = Common<{
    menuInfo: MenuItem
    parentMenuList: SubMenuList[]
}>

// 获取指定id的菜单信息
export const getEditMenuInfo = (id: number) => {
    console.log(id)
    return request<EditMenuInfo>({
        method: 'GET',
        url: '/boss/menu/getEditMenuInfo',
        params: {
            id,
        },
    })
}