import { computed, ref } from 'vue'
import { getAll } from '@/api/menus'
import { ElMessage } from 'element-plus'
import type { MenuItem } from '@/api/menus'

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
    return { allMenus, getAllMenus, topMenus }
}