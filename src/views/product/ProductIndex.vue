<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useProducts } from '@/composables/useProducts'

const { allProducts, getAllProducts, handleDelete } = useProducts()

const router = useRouter()

getAllProducts()
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-button class="button" type="primary" @click="router.push({ name: 'product-create' })"
          >添加产品</el-button
        >
      </div>
    </template>
    <el-table :data="allProducts" border style="width: 100%">
      <el-table-column type="index" label="序号" align="center" width="180" />
      <el-table-column prop="name" label="产品名称" align="center" />
      <el-table-column prop="procedure" label="工序" align="center" width="180" />
      <el-table-column label="操作" align="center" v-slot="scope">
        <el-button
          type="primary"
          @click="router.push({ name: 'testunits', params: { id: scope.row.id } })"
          >进入用例</el-button
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