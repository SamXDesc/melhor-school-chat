
const routes = [
  {
    path: '/',
    component: () => import('layouts/ChatLayout.vue'),
    children: [
      { path: '', component: () => import('pages/chat/Index.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
