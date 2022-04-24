export const contentConfig: any = {
  title: '商品列表',
  headerHandleTitle: '添加商品',
  propList: [
    { prop: 'name', label: '名称', minWidth: '80' },
    { prop: 'oldPrice', label: '旧价格', minWidth: '80' },
    { prop: 'newPrice', label: '新价格', minWidth: '80' },
    { prop: 'status', label: '状态', minWidth: '100', slotName: 'status' },
    { prop: 'imgUrl', label: '图片', minWidth: '100', slotName: 'imgUrl' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '200',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '200',
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
