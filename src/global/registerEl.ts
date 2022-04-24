import { App } from 'vue';
import {
  ElButton,
  ElTabs,
  ElForm,
  ElFormItem,
  ElInput,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain
} from 'element-plus';
import {
  Avatar,
  Cellphone,
  Monitor,
  Setting,
  Goods,
  ChatLineRound,
  Expand,
  Fold,
  EditPen,
  Delete,
  Refresh,
  Bell,
  ChatDotRound,
  Postcard
} from '@element-plus/icons-vue';
// import { Calendar } from '@element-plus/icons-vue';
const components = [
  ElButton,
  ElTabs,
  Avatar,
  Cellphone,
  ElForm,
  ElFormItem,
  ElInput,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  Monitor,
  Setting,
  Goods,
  ChatLineRound,
  Expand,
  Fold,
  EditPen,
  Delete,
  Refresh,
  Bell,
  ChatDotRound,
  Postcard
];
export function registerEl(app: App): void {
  components.forEach((item) => {
    app.component(item.name, item);
  });
}
