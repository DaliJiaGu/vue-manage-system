<template>
  <div class="login-acount">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"> </el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password"> </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { ElForm } from 'element-plus';
// import { useStore } from 'vuex';
import { useStore } from 'vuex';
import localCache from '../../../utils/cache';

export default defineComponent({
  setup() {
    // 为什么创建出来的store是undefined
    const store = useStore();
    console.log(store);
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    });

    const formRef = ref<InstanceType<typeof ElForm>>();
    const loginAction = (isKeepPassword: boolean) => {
      // 首先要验证用户填写的信息是否正确
      formRef.value?.validate((valid) => {
        // 只要valid拿到的是true，就说明用户填写的信息是无误的

        if (valid) {
          // 1. 判断是否记住密码
          if (isKeepPassword) {
            localCache.setCache('name', account.name);
            localCache.setCache('password', account.password);
          } else {
            localCache.deleteCache('name');
            localCache.deleteCache('password');
          }
          // 2. 进行登录操作
          try {
            store.dispatch('login/loginAccountAction', { ...account });
          } catch (error) {
            console.log(error);
          }
        }
      });
    };
    const rules = {
      name: [
        {
          required: true,
          message: '用户名不能为空！',
          target: 'blur'
        },
        {
          pattern: /^[a-z0-9]{4,10}$/,
          message: '用户名必须是4~10个字母或数字组成~',
          target: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: '密码不能为空！',
          target: 'blur'
        },
        {
          pattern: /^[a-z0-9]{6,}$/,
          message: '密码必须是6位或以上的数组或字母组成~',
          target: 'blur'
        }
      ]
    };
    return {
      account,
      rules,
      loginAction,
      formRef
    };
  }
});
</script>

<style scoped></style>
