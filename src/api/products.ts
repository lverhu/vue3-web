import request from "@/utils/request";

// 定义类型
type Common<T> = {
    code: string
    message: string
    data: T
}

export type ProductItem = {
    id: number
    name: string
    procedure: string
}

//获取所有菜单项
export const getAll = () => {
    return request<Common<ProductItem[]>>({
        method: 'GET',
        url: 'products/'
    })
}

//部分？
// type CreateOrEditMenu = Partial<MenuItem>
//挑选，要什么
export type CreateOrEditProduct = Pick<
    ProductItem,
    "id" | "name" | "procedure"
> & { id?: number }
//剔除什么
// type CreateOrEditMenu = Omit<
//     MenuItem,
//     "createdBy" | "createTime" | "level" | "operatoreId" | "updateBy" | "updatedTime"
// > & { id?: number }
// 保存或更新菜单
export const saveOrUpdate = (productInfo: CreateOrEditProduct) => {
    console.log("saveOrUpdate id", productInfo.id)
    if (productInfo.id != 0) {
        return request<Common<ProductItem>>({
            method: 'PUT',
            url: `/products/${productInfo.id}`,
            data: productInfo
        })
    } else {
        return request<Common<ProductItem>>({
            method: 'POST',
            url: '/products/',
            data: productInfo
        })
    }
}

// 删除菜单
export const deleteProduct = (id: number) => {
    console.log(id)
    return request<Common<boolean>>({
        method: 'DELETE',
        url: `/products/${id}`,
    })
}

// 获取指定id的菜单信息
export const getEditProductInfo = (id: number) => {
    console.log(id)
    return request<Common<ProductItem>>({
        method: 'GET',
        url: `/products/${id}`,
    })
}