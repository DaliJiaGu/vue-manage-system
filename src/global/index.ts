import { App } from 'vue';
import { registerEl } from './registerEl';
import { registerProperties } from './registerProperties';
export default function (app: App): void {
  registerEl(app);
  registerProperties(app);
}
