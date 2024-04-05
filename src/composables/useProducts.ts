import { computed, ref } from 'vue'
import { getAll, saveOrUpdate ,getEditProductInfo,deleteProduct} from '@/api/products'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { ProductItem, CreateOrEditProduct} from '@/api/products'
import router from "@/router/index"

export function useProducts() {
    // 1、先获取所有产品
    const allProducts = ref([] as ProductItem[])
    const getAllProducts = async () => {
        // 将res中的data解析出来，只需要data
        const { data } = await getAll()
        console.log('get all products', data)
        if (data.code === '0') {
            allProducts.value = data.data
        } else {
            ElMessage.error('获取产品信息失败')
            throw new Error('获取产品信息失败')
        }
    }
    // // 2、再从所有列表中过滤出来一级产品
    // const topMenus = computed(() => {
    //     return allMenus.value.filter((menu) => menu.level === 0)
    // })

    //表单的响应式数据
    const form = ref<CreateOrEditProduct>({
        name: "",
        procedure: "",
        id: 0,
    })

    // 表单提交事件
    const onSubmit = async () => {
        const { data } = await saveOrUpdate(form.value)
        console.log(data)
        if (data.code === '0') {
            ElMessage.success(`${msgText.value}产品成功`)
            router.push({ name: 'products' })
        } else {
            ElMessage.error(`${msgText.value}产品失败!`)
            throw new Error(`${msgText.value}产品失败!`)
        }
        return
    }

    // 删除产品的事件处理函数
    const handleDelete = async (id: number) => {
        await ElMessageBox.confirm("确认要删除该产品吗？", "删除提醒", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
        }).catch(() => {
            ElMessage.info("删除操作被取消!")
            return new Promise(() => { })   //pendding
        })

        // 调用接口函数
        const { data } = await deleteProduct(id)
        if (data.code === '0') {
            ElMessage.success("删除产品成功")
            getAllProducts()
        } else {
            ElMessage.error('删除产品失败!')
            throw new Error('删除产品失败!')
        }
    }

    // 根据id获取产品信息
    const getProductInfoById = async (id: string) => {
        // 根据id判断状态
        if(!Number(id)){
            isCreate.value = true
            return
        }else{
            isCreate.value = false
        }
        console.log("productid:", id)
        // 通过接口获取
        const { data } = await getEditProductInfo(Number(id))
        console.log("根据id获取产品信息", data)
        if (data.code === "0") {
            form.value = data.data
        } else {
            ElMessage.error("获取编辑产品信息失败!")
            throw new Error("获取编辑产品信息失败!")
        }
    }

    // 1、定义一个状态与提示文本
    const isCreate = ref(true)
    const msgText = computed(() => (isCreate.value ? '创建' : '更新'))

    return { allProducts, getAllProducts, form, onSubmit,getProductInfoById,msgText,handleDelete }
}