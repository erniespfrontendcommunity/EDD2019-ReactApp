import React from 'react';

export const routesMap = {
  HOME: {
    path: '/',
    component: React.lazy(() => import( /* webpackChunkName: "Lore" */ /* webpackPrefetch: true */  './pages/Lore')),
    label: 'Lore'
  },
  CREATE_CAT: {
    path: '/createCat',
    component: React.lazy(() => import( /* webpackChunkName: "AddCat" */ './pages/CreateCatForm')),
    label: 'Create Cat'
  },
  CAT_LIST: {
    path: '/catSquad',
    component: React.lazy(() => import( /* webpackChunkName: "CatSquad" */ './pages/CatSquad')),
    label: 'Add Cats to Squad'
  },
  PLAY_LEAGUE: {
    path: '/playLeague',
    component: React.lazy(() => import( /* webpackChunkName: "PlayLeague" */ './pages/PlayLeague')),
    label: 'Play Cat League'
  },
  TEST: {
    path: '/test',
    component: React.lazy(() => import( /* webpackChunkName: "SandBox" */ './pages/SandBox')),
    label: 'Sandbox'
  },
}
