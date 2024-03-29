<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import {useMenus} from '@/composables/useMenus'

const {allMenus, getAllMenus} = useMenus()

const router = useRouter()

getAllMenus()
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-button class="button" type="primary" @click="router.push({ name: 'menu-create' })"
          >添加菜单</el-button
        >
      </div>
    </template>
    <el-table :data="allMenus" border style="width: 100%">
      <el-table-column type="index" label="序号" align="center" width="180" />
      <el-table-column prop="name" label="菜单名称" align="center" />
      <el-table-column prop="level" label="菜单层级" align="center" width="180" />
      <el-table-column prop="icon" label="菜单图标" align="center" />
      <el-table-column prop="orderNum" label="排序" align="center" />
      <el-table-column label="操作" align="center">
        <el-button type="primary">编辑</el-button>
        <el-button type="danger">删除</el-button>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: auto;
}
</style>