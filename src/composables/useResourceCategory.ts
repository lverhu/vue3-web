import type { ResourceCategory } from '@/api/resource-category'
import { ElMessage } from 'element-plus'
import { getAll, saveOrderUpdate } from '@/api/resource-category'
import { reactive, ref } from 'vue'

// 保存所有资源类别信息
export const allResourceCategory = ref<ResourceCategory[]>([])


// 获取所有资源类别信息
export const getAllResourceCategory = async () => {
    const { data } = await getAll()
    if (data.code === '000000') {
        allResourceCategory.value = data.data
    } else {
        ElMessage.error('获取资源类型失败...')
        throw new Error('获取资源类型失败...')
    }
}

// 提交按钮事件处理函数
export const onSubmit = async () => {
    const { data } = await saveOrderUpdate(form).finally(() => (dialogFormVisible.value = false))
    console.log(data)
    if (data.code === '000000') {
        ElMessage.success(`${msgText.value}资源类型成功!`)
        getAllResourceCategory()
    } else {
        ElMessage.error(`${msgText.value}资源类型失败!`)
        throw new Error(`${msgText.value}资源类型失败!`)
    }
}

export const form = reactive({
    name: '',
    sort: 0
})

export const isCreate = ref(true)
export const dialogFormVisible = ref(false)
export const msgText = ref('')