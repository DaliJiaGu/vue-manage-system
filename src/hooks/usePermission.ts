import { useStore } from '@/store';

export function usePermission(
  pageNames: string | undefined,
  handle: string
): boolean {
  const store = useStore();
  const permission = store.state.login.permission;
  const myPermission = `system:${pageNames}:${handle}`;
  return !!permission.find((item) => item === myPermission);
  // return false;
}
