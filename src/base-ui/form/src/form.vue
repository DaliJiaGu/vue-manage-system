<template>
  <div class="xlForm">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth" :style="itemStyle" v-bind="itemLayout">
      <el-row>
        <template v-for="item in formItem" :key="item.label">
          <el-col v-bind="itemLayout">
            <el-form-item :label="item.label" v-if="!item.isHide">
              <!-- 处理密码或者是输入框 -->
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input v-model="formData[`${item.field}`]"></el-input>
              </template>
              <!-- 处理选项卡 -->
              <template v-if="item.type === 'select'">
                <el-select v-model="formData[`${item.field}`]">
                  <template
                    v-for="subItem in item.otherOptions"
                    :key="subItem.label"
                  >
                    <el-option v-bind="subItem" />
                  </template>
                </el-select>
              </template>
              <!-- 处理时间选项卡 -->
              <template v-if="item.type === 'dataTimePicker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                  format="YYYY/MM/DD"
                  value-format="YYYY-MM-DD"
                >
                </el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';
import { IFormType } from '../types';
export default defineComponent({
  props: {
    modelValue: {
      type: Object
    },
    formItem: {
      type: Array as PropType<IFormType[]>,
      // 属性的类型是对象或者是数组，那么其默认值一般都是要以函数返回值的形式设置
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '80px'
    },
    itemStyle: {
      type: Object,
      default: () => ({
        padding: '10px 40px'
      })
    },
    itemLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        xm: 24,
        xs: 24
      })
    }
  },
  emits: ['update:modelValue'],

  setup(props, { emit }) {
    // 这是不对的做法
    // const formData = computed({
    //   set(newValue) {
    //     emit('update:modelValue', newValue);
    //   },
    //   get() {
    //     return props.modelValue;
    //   }
    // });
    // 这种相当于是对modelValue做了一个拷贝
    const formData = ref({ ...props.modelValue });
    watch(
      formData,
      (newValue) => {
        emit('update:modelValue', newValue);
      },
      // 深度监听
      { deep: true }
    );
    return { formData };
  }
});
</script>

<style scoped>
.xlForm {
  padding-top: 22px;
}
.header {
  margin-bottom: 10px;
}
.footer {
  text-align: right;
  padding: 0px 40px 20px;
}
</style>
