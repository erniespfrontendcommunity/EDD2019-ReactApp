import React from 'react';

export const routesMap = {
  HOME: {
    path: '/',
    component: React.lazy(() => import('./pages/Lore')),
    label: 'Lore'
  },
  CREATE_CAT: {
    path: '/createCat',
    component: React.lazy(() => import('./pages/AddCat')),
    label: 'Create Cat'
  },
  CAT_LIST: {
    path: '/catSquad',
    component: React.lazy(() => import('./pages/CatSquad')),
    label: 'Add Cats to Squad'
  },
  PLAY_LEAGUE: {
    path: '/playLeague',
    component: React.lazy(() => import('./pages/PlayLeague')),
    label: 'Play Cat League'
  },
  TEST: {
    path: '/test',
    component: React.lazy(() => import('./pages/SandBox')),
    label: 'Sandbox'
  },
}
