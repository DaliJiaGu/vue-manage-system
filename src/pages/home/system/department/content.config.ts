export const contentConfig: any = {
  title: '部门列表',
  headerHandleTitle: '新建部门',
  propList: [
    { prop: 'name', label: '部门名称', width: '120' },
    { prop: 'leader', label: '部门领导', width: '120' },
    { prop: 'parentId', label: '上级部门', width: '120' },
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
