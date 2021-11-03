export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: '登录',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: '二级管理页',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/articlelist',
  },
  {
    name: '新增文章',
    icon: 'smile',
    path: '/articlelist/new',
    component: './ArticleList/NewArticle',
  },
  {
    name: '文章管理',
    icon: 'smile',
    path: '/articlelist',
    component: './ArticleList',
  },
  {
    name: '文章类型管理',
    icon: 'smile',
    path: '/articleTypeList',
    component: './ArticleTypeList',
  },
  {
    component: './404',
  },
];
