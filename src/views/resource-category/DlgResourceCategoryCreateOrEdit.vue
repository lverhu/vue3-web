<script setup lang="ts">
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'
import {
  onSubmit,
  dialogFormVisible,
  isCreate,
  msgText,
  form
} from '@/composables/useResourceCategory'

const formLabelWidth = '140px'

const initAndShow = (id = 0) => {
  fmResourceCategory.value?.resetFields()
  dialogFormVisible.value = true
  if (id) {
    isCreate.value = false
    msgText.value = '更新'
  } else {
    isCreate.value = true
    msgText.value = '创建'
  }
}

const fmResourceCategory = ref<FormInstance>()

defineExpose({
  initAndShow
})
</script>

<template>
  <el-dialog v-model="dialogFormVisible" :title="msgText + '资源类别'" width="600">
    <el-form :model="form" ref="fmResourceCategory">
      <el-form-item label="类别名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="排序" :label-width="formLabelWidth" prop="sort">
        <el-input v-model="form.sort" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 提交 </el-button>
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