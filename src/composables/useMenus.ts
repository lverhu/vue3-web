import { computed, ref } from 'vue'
import { getAll, saveOrUpdate, deleteMenu, getEditMenuInfo } from '@/api/menus'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { MenuItem, CreateOrEditMenu, } from '@/api/menus'
import router from "@/router/index"

export function useMenus() {
    // 获取一机菜单
    // 1、先获取所有菜单
    const allMenus = ref([] as MenuItem[])
    const getAllMenus = async () => {
        // 将res中的data解析出来，只需要data
        const { data } = await getAll()
        console.log('get all menus', data)
        if (data.code === '000000') {
            allMenus.value = data.data
        } else {
            ElMessage.error('获取菜单信息失败')
            throw new Error('获取菜单信息失败')
        }
    }
    // 2、再从所有列表中过滤出来一级菜单
    const topMenus = computed(() => {
        return allMenus.value.filter((menu) => menu.level === 0)
    })

    //表单的响应式数据
    const form = ref<CreateOrEditMenu>({
        name: "",
        href: "",
        parentId: -1,
        description: "",
        icon: "",
        shown: true,
        orderNum: 0,
    })

    // const form = ref({} as CreateOrEditMenu)

    // 表单提交事件
    const onSubmit = async () => {
        const { data } = await saveOrUpdate(form.value)
        console.log(data)
        if (data.code === '000000') {
            ElMessage.success(`${msgText.value}菜单成功`)
            router.push({ name: 'menus' })
        } else {
            ElMessage.error(`${msgText.value}菜单失败!`)
            throw new Error(`${msgText.value}菜单失败!`)
        }
        return
    }

    // 删除菜单的事件处理函数
    const handleDelete = async (id: number) => {
        await ElMessageBox.confirm("确认要删除该菜单吗？", "删除提醒", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
        }).catch(() => {
            ElMessage.info("删除操作被取消!")
            return new Promise(() => { })   //pendding
        })

        // 调用接口函数
        const { data } = await deleteMenu(id)
        if (data.code === '000000') {
            ElMessage.success("删除菜单成功")
            getAllMenus()
        } else {
            ElMessage.error('删除菜单失败!')
            throw new Error('删除菜单失败!')
        }
    }

    // 根据id获取菜单信息
    const getMenuInfoById = async (id: string) => {
        // 根据id判断状态
        if(!Number(id)){
            isCreate.value = true
            return
        }else{
            isCreate.value = false
        }
        // 通过接口获取
        const { data } = await getEditMenuInfo(Number(id))
        console.log("根据id获取菜单信息", data)
        if (data.code === "000000") {
            form.value = data.data.menuInfo
        } else {
            ElMessage.error("获取编辑菜单信息失败!")
            throw new Error("获取编辑菜单信息失败!")
        }
    }

    // 1、定义一个状态与提示文本
    const isCreate = ref(true)
    const msgText = computed(() => (isCreate.value ? '创建' : '更新'))
    // 2、

    return { allMenus, getAllMenus, topMenus, form, onSubmit, handleDelete, getMenuInfoById, msgText }
}