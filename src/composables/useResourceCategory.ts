import { getAll } from '@/api/resource-category'
import type { ResourceCategory } from '@/api/resource-category'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

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