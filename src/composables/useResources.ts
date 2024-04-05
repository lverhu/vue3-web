import { getResourcePages } from "@/api/resources";
import type { Condition, QueriedResult } from "@/api/resources";
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";


//查询条件
export const queryCondition = reactive<Condition>({
    name: '',
    url: '',
    categoryId: '',
    current: 1,
    size: 5
})

//查询结果
export const queriedResult = ref<QueriedResult>({
    current: 1,
    records: [],
    size: 0,
    total: 0,
})

//查询方法
export const queryResources = async (parmas: Condition = {}) => {
    Object.assign(queryCondition, parmas)
    const { data } = await getResourcePages(queryCondition)
    console.log(data)
    if (data.code === '000000') {
        queriedResult.value = data.data
    } else {
        ElMessage.error('获取资源失败...')

    }
}
