import { computed, ref } from 'vue'
import { getAll } from '@/api/testunits'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { TestUnitItem } from '@/api/testunits'
import router from "@/router/index"

export function useTestUnits() {
    // 1、先获取所有产品
    const allTestUnits = ref([] as TestUnitItem[])
    const getAllTestUnits = async () => {
        // 将res中的data解析出来，只需要data
        const { data } = await getAll()
        console.log('get all testunits', data)
        if (data.code === '0') {
            allTestUnits.value = data.data
        } else {
            ElMessage.error('获取用例信息失败')
            throw new Error('获取用例信息失败')
        }
    }

    return { allTestUnits, getAllTestUnits }
}