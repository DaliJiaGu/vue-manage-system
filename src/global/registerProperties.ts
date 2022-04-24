import { App } from 'vue';

import { formatUtcString } from '@/utils/formatUtcString';
export function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatUtcString(value);
    }
  };
}
