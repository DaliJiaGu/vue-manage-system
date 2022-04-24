<template>
  <div class="login-acount">
    <el-form :rules="rules" :model="phone">
      <el-form-item label="手机号" prop="number">
        <el-input v-model="phone.number"> </el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="verityCode">
        <div class="verity-code">
          <el-input v-model="phone.verityCode"> </el-input>
          <el-button type="primary" class="verity-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
    const phone = reactive({
      verityCode: '',
      number: ''
    });
    const rules = {
      number: [
        {
          pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
          message: '请正确输入手机号码~',
          target: 'blur'
        }
      ],
      verityCode: [
        {
          pattern: /^[0-9]{4}$/,
          message: '请正确输入验证码~',
          target: 'blur'
        }
      ]
    };
    return {
      phone,
      rules
    };
  }
});
</script>

<style scoped>
/* 设置验证码 */
.verity-code {
  display: flex;
  justify-content: space-around;
}
.verity-btn {
  margin-left: 8px;
}
</style>
