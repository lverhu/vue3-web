<script setup lang="ts">
import { isCollapse } from './menu-collapse'
</script>

<template>
  <el-aside>
    <el-scrollbar>
      <el-menu router unique-opened :collapse="isCollapse">
        <a href="/" class="logo">
          <img src="@/assets/logo.svg" alt="" />
          <h1>天空之境</h1>
        </a>
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <Setting />
            </el-icon>
            <span>权限管理</span>
          </template>
          <el-menu-item index="/menus">
            <el-icon>
              <Setting />
            </el-icon>
            <span>菜单列表</span>
          </el-menu-item>
          <el-menu-item index="/resource-category">
            <el-icon>
              <Setting />
            </el-icon>
            <span>资源列表</span>
          </el-menu-item>
          <el-menu-item index="/roles">
            <el-icon>
              <Setting />
            </el-icon>
            <span>角色列表</span>
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item index="/users">
          <el-icon>
            <Setting />
          </el-icon>
          <span>用户管理</span>
        </el-menu-item>

        <el-menu-item index="/products">
          <el-icon>
            <Setting />
          </el-icon>
          <span>产品管理</span>
        </el-menu-item>

        <el-menu-item index="/course">
          <el-icon>
            <Setting />
          </el-icon>
          <span>课程管理</span>
        </el-menu-item>

        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <Setting />
            </el-icon>
            <span>广告管理</span>
          </template>
          <el-menu-item index="/adv-list">
            <el-icon>
              <Setting />
            </el-icon>
            <span>广告列表</span>
          </el-menu-item>
          <el-menu-item index="/adv-space">
            <el-icon>
              <Setting />
            </el-icon>
            <span>广告位管理</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style lang="scss" scoped>
.el-aside {
  background-color: #e9e9eb;
  height: 100vh;
  width: auto;
}

.el-menu {
  background-color: #e9e9eb;
  border-right: none;
  width: 200px;

  &.el-menu--collapse {
    width: 60px;

    & h1 {
      display: none;
    }
  }
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  text-decoration: none;
  color: black;

  img {
    width: 32px;
    height: 32px;
  }
}
</style>