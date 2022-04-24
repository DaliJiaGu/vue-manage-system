export const contentConfig: any = {
  title: '商品类别',
  headerHandleTitle: '新建分类',
  propList: [
    { prop: 'name', label: '类别名称', minWidth: '120' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '240',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '240',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      minWidth: '140',
      slotName: 'handle'
    }
  ],
  showIndexColumn: true,
  showSelectColumn: true
};
