<template>
  <div class="nav-info">
    <div class="info">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar
            size="medium"
            class="avatar"
            src="https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240"
          ></el-avatar>
          <span class="name">{{ username }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              icon="el-icon-circle-close"
              @click="handleExitClick"
              >退出系统</el-dropdown-item
            >
            <el-dropdown-item icon="el-icon-info" divided
              >个人信息</el-dropdown-item
            >
            <el-dropdown-item icon="el-icon-unlock">修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="operation">
      <span
        ><el-icon><bell /></el-icon
      ></span>
      <span
        ><el-icon><chat-dot-round /></el-icon
      ></span>
      <span>
        <span class="dot"></span>
        <el-icon><postcard /></el-icon>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '../../../store';
import { useRouter } from 'vue-router';

import localCache from '../../../utils/cache';

export default defineComponent({
  setup() {
    const store = useStore();
    const name = computed(() => store.state.login.userInfo.name);

    const router = useRouter();

    const handleExitClick = () => {
      localCache.deleteCache('token');
      router.push('/main');
    };
    const username = localCache.getCache('name');

    return {
      name,
      handleExitClick,
      username
    };
  }
});

Number('123');
</script>

<style scoped lang="less">
.nav-info {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;

  .el-dropdown-link {
    display: flex;
    align-items: center;
    cursor: pointer;

    .avatar {
      width: 30px;
      height: 30px;
    }
    .name {
      margin-left: 8px;
    }
  }

  .operation {
    margin-right: 20px;
    span {
      position: relative;
      display: inline-block;
      width: 40px;
      height: 35px;
      line-height: 35px;

      &:hover {
        background: #f2f2f2;
      }

      i {
        font-size: 20px;
      }

      .dot {
        position: absolute;
        top: 3px;
        right: 3px;
        z-index: 10;
        width: 6px;
        height: 6px;
        background: red;
        border-radius: 100%;
      }
    }
  }
}
</style>
