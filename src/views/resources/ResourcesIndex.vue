<script setup lang="ts">
import { queryCondition, queriedResult, queryResources } from '@/composables/useResources'
import { allResourceCategory, getAllResourceCategory } from '@/composables/useResourceCategory'
import { timeFormatter } from '@/utils/timeHandlers'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { ElMessageBox, FormInstance, ElMessage } from 'element-plus'
import DlgResourceCreateOrEdit from './DlgResourceCreateOrEdit.vue'
import { deleteResource } from '@/api/resources'

const router = useRouter()

queryResources()
getAllResourceCategory()
const queryFm = ref<FormInstance>()
const dlgCreateOrEdit = ref<InstanceType<typeof DlgResourceCreateOrEdit> | null>(null) //对话框组建引用

// 删除资源
const handleDelete = async (id: number) => {
  // 1.先进行确认
  await ElMessageBox.confirm('确实要删除吗?', '删除询问', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).catch(() => {
    ElMessage.info('删除动作被取消...')
    return new Promise(() => {})
  })
  //   2.确认后进行真实的删除请求
  const { data } = await deleteResource(id)
  if (data.code === '000000') {
    ElMessage.success('删除资源成功!')
    queryResources({ current: 1 })
  } else {
    ElMessage.error('删除资源失败...')
    throw new Error('删除资源失败...')
  }
}
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <el-form :inline="true" :model="queryCondition" ref="queryFm" class="demo-form-inline">
        <el-form-item label="资源名称" prop="name">
          <el-input v-model="queryCondition.name" placeholder="资源名称" clearable />
        </el-form-item>
        <el-form-item label="资源路径" prop="url">
          <el-input v-model="queryCondition.url" placeholder="资源路径" clearable />
        </el-form-item>
        <el-form-item label="资源分类" prop="categoryId">
          <el-select v-model="queryCondition.categoryId" placeholder="资源分类">
            <el-option label="不限" value=""></el-option>
            <el-option
              v-for="category in allResourceCategory"
              :key="category.id"
              :label="category.name"
              :value="category.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="" @click="queryFm?.resetFields()">重置</el-button>
          <el-button type="primary" @click="queryResources()">查询</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-button size="large" @click="dlgCreateOrEdit?.initAndShow()">添加资源</el-button>
    <el-button size="large" @click="router.push({ name: 'resource-category' })">资源类别</el-button>
    <el-table :data="queriedResult.records" border style="width: 100%">
      <el-table-column prop="index" label="序号" align="center" />
      <el-table-column prop="name" label="资源名称" align="center" />
      <el-table-column prop="url" label="资源路径" align="center" />
      <el-table-column prop="description" label="描述" align="center" />
      <el-table-column
        prop="createdTime"
        label="添加时间"
        :formatter="timeFormatter"
        align="center"
      />
      <el-table-column label="操作" align="center" v-slot="{ row }">
        <el-button type="primary" @click="dlgCreateOrEdit?.initAndShow(row.id)">编辑</el-button>
        <el-button type="danger" @click="handleDelete(row.id)">删除</el-button>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="queriedResult.current"
      :page-size="queriedResult.size"
      :page-sizes="[5, 10, 20, 30]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="queriedResult.total"
      @size-change="
        (size) => {
          queryResources({ size, current: 1 })
        }
      "
      @current-change="
        (current) => {
          queryResources({ current })
        }
      "
    />
    <DlgResourceCreateOrEdit ref="dlgCreateOrEdit"></DlgResourceCreateOrEdit>
  </el-card>
</template>

<style lang="scss" scoped>
.el-table {
  margin-top: 17px;
  margin-bottom: 17px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.box-card {
  width: auto;
}
</style>