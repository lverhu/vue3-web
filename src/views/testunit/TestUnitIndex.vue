<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useTestUnits } from '@/composables/useTestUnits'
import { useRoute } from 'vue-router'

const { allTestUnits, getAllTestUnits } = useTestUnits()

const router = useRouter()
const route = useRoute()

console.log('route.params.id', route.params?.id)

getAllTestUnits()
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-button class="button" type="primary" @click="router.push({ name: 'product-create' })"
          >添加用例</el-button
        >
      </div>
    </template>
    <el-table :data="allTestUnits" border style="width: 100%">
      <el-table-column type="index" label="序号" align="center" width="180" />
      <el-table-column prop="name" label="用例名称" align="center" />
      <el-table-column prop="function" label="函数" align="center" width="180" />
      <el-table-column prop="description" label="描述信息" align="center" width="180" />
      <el-table-column label="操作" align="center" v-slot="scope">
        <el-button
          type="primary"
          @click="router.push({ name: 'product-edit', params: { id: scope.row.id } })"
          >配置参数</el-button
        >
        <el-button
          type="primary"
          @click="router.push({ name: 'product-edit', params: { id: scope.row.id } })"
          >编辑</el-button
        >
        <el-button type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
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