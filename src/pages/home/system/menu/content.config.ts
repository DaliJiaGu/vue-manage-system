export const contentConfig: any = {
  title: '菜单列表',
  headerHandleTitle: '新建菜单',
  propList: [
    { prop: 'name', label: '菜单名称', minWidth: '120' },
    { prop: 'type', label: '菜单类型', minWidth: '100' },
    { prop: 'url', label: '菜单url', minWidth: '100' },
    { prop: 'permission', label: '按钮权限', minWidth: '100' },
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
  showIndexColumn: false,
  showSelectColumn: false,
  showPagination: false,
  // 展示子列表
  // chlidrenProps: {
  //   rowKey: 'id',
  //   treeProp: {
  //     children: 'children'
  //   }
  // },
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  }
};
