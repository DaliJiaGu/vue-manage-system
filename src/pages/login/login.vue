<template>
  <div class="login">
    <login-panel></login-panel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginPanel from './cpns/login-panel.vue';

export default defineComponent({
  components: {
    LoginPanel
  },
  setup() {
    return {};
  }
});
</script>

<style scoped>
.login {
  /* 关于login-panel组件的居中显示 */
  display: flex;
  justify-content: center;
  align-items: center;
  /* 实现背景图片的展示 */
  height: 100%;
  width: 100%;
  background-image: url('../../assets/img/login-bg.svg');
}
</style>
