import request from "@/utils/request";

// 定义类型
type Common<T> = {
    code: string
    message: string
    data: T
}

export type TestUnitItem = {
    id: number
    name: string
    function: string
    description: string
    product_name: string
}

//获取所有菜单项
export const getAll = () => {
    return request<Common<TestUnitItem[]>>({
        method: 'GET',
        url: 'testunits/'
    })
}

//部分？
// type CreateOrEditMenu = Partial<MenuItem>
//挑选，要什么
export type CreateOrEditTestUnit = Pick<
    TestUnitItem,
    "id" | "name" | "function"|"description"
> & { id?: number }
//剔除什么
// type CreateOrEditMenu = Omit<
//     MenuItem,
//     "createdBy" | "createTime" | "level" | "operatoreId" | "updateBy" | "updatedTime"
// > & { id?: number }
// 保存或更新菜单
export const saveOrUpdate = (testunitInfo: CreateOrEditTestUnit) => {
    console.log("saveOrUpdate id", testunitInfo.id)
    if (testunitInfo.id != 0) {
        return request<Common<TestUnitItem>>({
            method: 'PUT',
            url: `/testunits/${testunitInfo.id}`,
            data: testunitInfo
        })
    } else {
        return request<Common<TestUnitItem>>({
            method: 'POST',
            url: '/testunits/',
            data: testunitInfo
        })
    }
}

// 删除菜单
export const deleteTestUnit = (id: number) => {
    console.log(id)
    return request<Common<boolean>>({
        method: 'DELETE',
        url: `/testunits/${id}`,
    })
}

// 获取指定id的菜单信息
export const getEditTestUnitInfo = (id: number) => {
    console.log(id)
    return request<Common<TestUnitItem>>({
        method: 'GET',
        url: `/testunits/${id}`,
    })
}