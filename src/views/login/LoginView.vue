<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { login } from '@/utils/users'
import { useTokenStore } from '@/stores/mytoken'
import { useRouter, useRoute } from 'vue-router'

const store = useTokenStore()
const router = useRouter()
const route = useRoute()

const form = reactive({
  phone: '18012936866',
  password: '123456'
})

// 登陆事件处理
const onSubmit = async () => {
  isLoading.value = true
  // 表单校验
  await formRef.value?.validate().catch((err) => {
    ElMessage.error('表单校验失败')
    // 表单校验失败，执行到这里结束
    isLoading.value = false
    throw err
    // return new Promise(() => {})
  })

  //   正式登陆请求
  console.log('正式登陆请求')
  const data = await login(form).then((res) => {
    if (!res.data.success) {
      ElMessage.error('登陆信息有误！')
      isLoading.value = false
      throw new Error('登陆信息有误')
    }
    return res.data
  })

// 保存token信息
  store.saveToken(data.content)

  isLoading.value = false

  ElMessage.success('登陆成功！')
  router.push((route.query.redirect as string) || '/')
}

// 定义表单校验规则
const rules = reactive<FormRules>({
  phone: [
    { required: true, message: '电话号码不能为空', trigger: 'blur' },
    { pattern: /^1\d{10}$/, message: '手机号必须是11位数字', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 18, message: '密码长度需要6~18位', trigger: 'blur' }
  ]
})

// 定义是否登陆加载中
const isLoading = ref(false)

const formRef = ref<FormInstance>()
</script>

<template>
  <div class="login">
    <el-form
      :model="form"
      :rules="rules"
      ref="formRef"
      label-width="120px"
      label-position="top"
      size="large"
    >
      <h2>登陆</h2>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="isLoading">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.login {
  background-color: #ddd;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .el-form {
    width: 300px;
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;

    .el-form-item {
      margin-top: 20px;
    }

    .el-button {
      width: 100%;
      margin-top: 30px;
    }
  }
}
</style>