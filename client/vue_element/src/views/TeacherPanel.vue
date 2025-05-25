<template>
  <el-container>
    <el-aside width="200px">
      <el-menu mode="vertical" router>
        <el-menu-item index="/teacher/function1">功能1</el-menu-item>
        <el-menu-item index="/teacher/function2">功能2</el-menu-item>
        <el-menu-item index="/teacher/function3">功能3</el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <h1>教师界面</h1>
        <button @click="logout">退出登录</button>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'TeacherPanel',
  methods: {
    logout() {
      // 这里可以添加退出登录的逻辑，例如清除 token 等
      this.$router.push('/'); // 跳转到登录页面
    }
  }
};
</script>

<style>
@import '@/assets/sidebar.css';
</style>