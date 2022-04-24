export const contentConfig: any = {
  title: '用户列表',
  headerHandleTitle: '新建用户',
  propList: [
    { prop: 'name', label: '用户名', width: '120' },
    { prop: 'realname', label: '真实姓名', width: '120' },
    { prop: 'cellphone', label: '手机号码', width: '160' },
    { prop: 'enable', label: '状态', width: '100', slotName: 'status' },
    {
      prop: 'createAt',
      label: '创建时间',
      width: '240',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      width: '240',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      width: '140',
      slotName: 'handle'
    }
  ],
  showIndexColumn: true,
  showSelectColumn: true
};
