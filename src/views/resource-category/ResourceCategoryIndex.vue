<script setup lang="ts">
import { allResourceCategory, getAllResourceCategory, handleDelete } from '@/composables/useResourceCategory'
import { timeFormatter } from '@/utils/timeHandlers'
import DlgResourceCategoryCreateOrEdit from './DlgResourceCategoryCreateOrEdit.vue'
import { ref } from 'vue'

getAllResourceCategory()
const dlgCreateOrEdit = ref<InstanceType<typeof DlgResourceCategoryCreateOrEdit>>()

</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <h3>资源类别列表</h3>
        <el-button class="button" type="primary" @click="dlgCreateOrEdit?.initAndShow()"
          >创建类别</el-button
        >
      </div>
    </template>
    <el-table :data="allResourceCategory" border style="width: 100%">
      <el-table-column type="index" label="序号" align="center" />
      <el-table-column prop="name" label="类别名称" align="center" />
      <el-table-column
        prop="createdTime"
        label="创建时间"
        align="center"
        :formatter="timeFormatter"
      />
      <el-table-column prop="sort" label="排序" align="center" />
      <el-table-column label="操作" align="center" v-slot="{ row }">
        <el-button type="primary">编辑</el-button>
        <el-button type="danger" @click="handleDelete(row.id)">删除</el-button>
      </el-table-column>
    </el-table>
    <DlgResourceCategoryCreateOrEdit ref="dlgCreateOrEdit"></DlgResourceCategoryCreateOrEdit>
  </el-card>
</template>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.box-card {
  width: auto;
}
</style> 