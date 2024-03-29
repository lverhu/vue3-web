<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { useMenus } from '@/composables/useMenus'

const { getAllMenus, topMenus } = useMenus()

getAllMenus()
</script>

<template>
  <h1>传家</h1>
</template>

<style lang="scss" scoped>
</style>