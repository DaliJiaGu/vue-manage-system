<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" :stretch="true">
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><avatar /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <login-account ref="LoginAccountRef"></login-account>
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><cellphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <login-phone></login-phone>
      </el-tab-pane>
    </el-tabs>
    <div class="control">
      <el-checkbox v-model="isKeepPassword" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import LoginAccount from './login-account.vue';
import LoginPhone from './login-phone.vue';

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    let isKeepPassword = ref(true);
    // 获取loginaccoun这个组件对象
    const LoginAccountRef = ref<InstanceType<typeof LoginAccount>>();
    const handleLoginClick = () => {
      // 这里一定要直接传isKeepPassword.value，因为在setup内部ref是不会进行解包的
      LoginAccountRef.value?.loginAction(isKeepPassword.value);
    };
    return {
      isKeepPassword,
      handleLoginClick,
      LoginAccountRef
    };
  }
});
</script>

<style scoped>
.login-panel {
  width: 320px;
  /* 提高用户体验感，让组件视觉上居中 */
  margin-bottom: 130px;
}
.title {
  text-align: center;
}
.demo-tabs {
  margin-top: 16px;
  box-shadow: 0px 0px 10px -3px grey;
}
.control {
  display: flex;
  justify-content: space-between;
}
.login-btn {
  width: 100%;
  margin-top: 10px;
}
</style>
