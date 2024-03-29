<script setup lang="ts">
import { isCollapse } from './menu-collapse'
import { reactive, ref, toRefs } from 'vue'
import { getInfo, logout } from '@/utils/users'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useTokenStore } from '@/stores/mytoken'
import { useRouter } from 'vue-router'

//不能在回调中声明
const router = useRouter()

const userInfo = ref({ portrait: '', userName: '' })

getInfo().then((res) => {
  console.log('user info response', res)
  userInfo.value = res.data.content
})

// 退出事件处理
const handleLogout = async () => {
  //1、询问，确认退出？
  await ElMessageBox.confirm('确认退出吗？', '退出询问', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).catch(() => {
    ElMessage.info('取消退出操作')
    return new Promise(() => {})
  })
  //2、执行退出
  await logout().catch(() => {})
  ElMessage.success('用户成功退出')
  //3、清空token，跳转到login页面
  useTokenStore().saveToken('')
  router.push({ name: 'login' })
}

const state = reactive({
  circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
})

const { circleUrl } = toRefs(state)
</script>

<template>
  <el-header>
    <!-- 图标 -->
    <el-icon @click="isCollapse = !isCollapse">
      <Expand v-show="isCollapse" />
      <Fold v-show="!isCollapse" />
    </el-icon>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">promotion management</a></el-breadcrumb-item>
      <el-breadcrumb-item>promotion list</el-breadcrumb-item>
      <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 下拉菜单 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="32" :src="userInfo.portrait" />
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
          <el-dropdown-item divided @click="handleLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>

<style lang="scss" scoped>
.el-header {
  display: flex;
  align-items: center;
  background-color: #adb7d2;
  .el-icon {
    margin-right: 17px;
  }
}
.el-dropdown {
  margin-left: auto;
  .el-dropdown-link {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>