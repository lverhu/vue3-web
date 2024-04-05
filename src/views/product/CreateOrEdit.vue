<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { useProducts } from '@/composables/useProducts'
import { useRoute } from 'vue-router'

const { getAllProducts, form, onSubmit,getProductInfoById ,msgText} = useProducts()

getAllProducts()
const route = useRoute()
console.log("route.params.id",route.params.id)
getProductInfoById(route.params.id as string)

const options = [
  {
    value: '工序1',
    label: '工序1',
  },
  {
    value: '工序2',
    label: '工序2',
  },
  {
    value: '工序3',
    label: '工序3',
  },
]

</script>

<template>
  <el-form :model="form" label-width="120px" size="large">
    <el-form-item label="产品名称">
      <el-input v-model="form.name" />
    </el-form-item>
    <!-- <el-form-item label="工序">
      <el-input v-model="form.procedure" />
    </el-form-item> -->

    <el-form-item label="工序">
      <el-select v-model="form.procedure" placeholder="选择测试工序">
        <!-- <el-option label="高温前测试工序" :value="高温前测试工序" /> -->
        <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即{{ msgText }}</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.el-form {
  background-color: #fff;
  padding: 70px;
}
</style>