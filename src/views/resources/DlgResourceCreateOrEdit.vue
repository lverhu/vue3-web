<script setup lang="ts">
import { reactive, ref } from 'vue'
import { allResourceCategory, getAllResourceCategory } from '@/composables/useResourceCategory'
import { saveOrUpdate } from '@/api/resources'
import { ElMessage } from 'element-plus'
import { getResourceById } from '@/api/resources'
import { queryResources } from '@/composables/useResources'

getAllResourceCategory()
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const initData = () => ({
  name: '',
  categoryId: 1,
  url: '',
  description: ''
})
const form = reactive(initData())

const isCreate = ref(true)
const msgText = ref('')
const initAndShow = async (id = 0) => {
  Object.assign(form, initData())
  dialogFormVisible.value = true
  if (id) {
    isCreate.value = false
    msgText.value = '更新'
    //获取要更新资源的数据信息
    const { data } = await getResourceById(id)
    if (data.code === '000000') {
        Object.assign(form, data.data)
    } else {
        ElMessage.error(`获取id为${id}的资源信息失败`)
        throw new Error(`获取id为${id}的资源信息失败`)
    }
  } else {
    isCreate.value = true
    msgText.value = '创建'
    return
  }
}
defineExpose({
  initAndShow
})

// 表单提交
const onSubmit = async () => {
  const { data } = await saveOrUpdate(form).finally(() => (dialogFormVisible.value = false))
  if (data.code === '000000') {
    ElMessage.success(`${msgText.value}资源成功!`)
    queryResources({ current: 1 })
  } else {
    ElMessage.error(`${msgText}资源失败!`)
    throw new Error(`${msgText}资源失败`)
  }
}
</script>

<template>
  <el-dialog v-model="dialogFormVisible" :title="msgText + '资源'">
    <el-form :model="form">
      <el-form-item label="资源名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="资源路径" :label-width="formLabelWidth" prop="url">
        <el-input v-model="form.url" autocomplete="off" />
      </el-form-item>
      <el-form-item label="资源类别" :label-width="formLabelWidth" prop="categoryId">
        <el-select v-model="form.categoryId" placeholder="资源类别">
          <el-option
            v-for="category in allResourceCategory"
            :key="category.id"
            :label="category.name"
            :value="category.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="资源描述" :label-width="formLabelWidth" prop="description">
        <el-input type="textarea" v-model="form.description" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>