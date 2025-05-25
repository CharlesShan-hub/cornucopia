<template>
  <div class="login-container">
    <div class="background"></div>
    <el-card class="login-card animated fadeIn">
      <template #header>
        <div class="card-header">
          <span class="title">Auth</span>
        </div>
      </template>
      <el-tabs v-model="activeTab" class="tabs pill-tabs">
        <el-tab-pane label="登录" name="login">
          <el-form :model="loginForm" @submit.prevent="login" label-width="80px" class="form">
            <el-form-item label="用户名">
              <el-input 
                v-model="loginForm.username" 
                prefix-icon="el-icon-user"
                class="input"
                placeholder="请输入用户名"
              />
            </el-form-item>
            <el-form-item label="密码">
              <el-input 
                v-model="loginForm.password" 
                type="password" 
                prefix-icon="el-icon-lock"
                class="input"
                placeholder="请输入密码"
              />
            </el-form-item>
            <el-form-item label="调试参数">
              <el-select v-model="debugParam" placeholder="请选择调试模式">
                <el-option label="使用服务器验证" value="0" />
                <el-option label="模拟管理员登录" value="1" />
                <el-option label="模拟教师登录" value="2" />
                <el-option label="模拟学生登录" value="3" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button 
                type="primary" 
                native-type="submit" 
                class="submit-btn"
                :loading="loginLoading"
                :disabled="!loginForm.username || !loginForm.password"
              >
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">
          <el-form :model="registerForm" @submit.prevent="register" label-width="80px" class="form">
            <el-form-item label="用户名">
              <el-input 
                v-model="registerForm.username" 
                prefix-icon="el-icon-user"
                class="input"
                placeholder="请输入用户名"
              />
            </el-form-item>
            <el-form-item label="密码">
              <el-input 
                v-model="registerForm.password" 
                type="password" 
                prefix-icon="el-icon-lock"
                class="input"
                placeholder="请输入密码"
              />
            </el-form-item>
            <el-form-item>
              <el-button 
                type="primary" 
                native-type="submit" 
                class="submit-btn"
                :loading="registerLoading"
                :disabled="!registerForm.username || !registerForm.password"
              >
                注册
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginPanel',
  data() {
    return {
      activeTab: 'login',
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        username: '',
        password: ''
      },
      loginLoading: false,
      registerLoading: false,
      debugParam: '0' // 新增调试参数，默认值为 '0'，注意这里改为字符串类型
    };
  },
  methods: {
    async login() {
      this.loginLoading = true;
      try {
        if (this.debugParam === '0') {
          // 调用后端登录接口
          const response = await axios.post('/api/login', {
            username: this.loginForm.username,
            password: this.loginForm.password
          });

          const userType = response.data.userType;

          // 根据用户类型进行跳转
          switch (userType) {
            case 'admin':
              this.$router.push('/admin');
              break;
            case 'teacher':
              this.$router.push('/teacher');
              break;
            case 'student':
              this.$router.push('/student');
              break;
            default:
              // 处理未知用户类型
              console.error('未知用户类型');
          }
        } else {
          // 根据调试参数进行跳转
          switch (parseInt(this.debugParam)) {
            case 1:
              this.$router.push('/admin');
              break;
            case 2:
              this.$router.push('/teacher');
              break;
            case 3:
              this.$router.push('/student');
              break;
          }
        }
      } catch (error) {
        // 处理登录失败
        console.error('登录失败:', error);
      } finally {
        this.loginLoading = false;
      }
    },
    async register() {
      this.registerLoading = true;
      try {
        // 实现注册逻辑
      } finally {
        this.registerLoading = false;
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #4e65ff, #92effd);
  margin-top: 0; /* 确保 margin-top 为 0 */
  padding-top: 0; /* 确保 padding-top 为 0 */
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('https://source.unsplash.com/1600x900/?nature') no-repeat center center fixed;
  background-size: cover;
  filter: blur(10px) brightness(0.7);
  z-index: -1;
}

.login-card {
  width: 450px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  margin-top: 0;
}

.login-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.card-header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0 20px;
}

.title {
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.pill-tabs .el-tabs__nav {
  border-radius: 25px;
  background-color: #ecf0f1;
  overflow: hidden;
}

.pill-tabs .el-tabs__item {
  padding: 0 30px;
  height: 42px;
  line-height: 42px;
  border-radius: 25px;
  transition: all 0.3s;
  font-size: 16px;
}

.pill-tabs .el-tabs__item.is-active {
  background-color: #2980b9;
  color: white;
}

.pill-tabs .el-tabs__active-bar {
  display: none;
}

.form {
  margin-top: 30px;
  width: 100%;
}

.input {
  border-radius: 12px;
  height: 48px;
  font-size: 16px;
}

.submit-btn {
  width: 100%;
  border-radius: 12px;
  height: 50px;
  font-size: 18px;
  font-weight: 600;
  transition: all 0.3s;
}

.submit-btn:hover {
  transform: scale(1.03);
}

.animated {
  animation-duration: 0.8s;
  animation-fill-mode: both;
}

.fadeIn {
  animation-name: fadeIn;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>