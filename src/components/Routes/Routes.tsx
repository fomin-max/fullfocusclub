import { lazy } from 'react';
import type { ComponentType } from 'react';
import { useLocation, Route, Routes as ReactRouter } from 'react-router-dom';

import { Layout } from 'components';
import { APP_URLS } from 'utils';

export type MetaInfoProps = Partial<
  Readonly<{
    meta: any[];
    lang: string;
    title: string;
    defer: boolean;
    locale: string;
    description: string;
  }>
>;

export type Route = Readonly<{
  path: string;
  name: string;
  metaInfo: MetaInfoProps;
  Component: ComponentType;
}>;

export const ROUTES: Route[] = [
  {
    path: APP_URLS.Landing,
    name: 'Landing',
    Component: lazy(
      () => import(/* webpackChunkName: "Landing" */ 'pages/Landing')
    ),
    metaInfo: {
      title: 'Landing',
      description: 'Landing Page',
    },
  },
  {
    path: '*',
    name: 'NotFound',
    Component: lazy(
      () => import(/* webpackChunkName: "NotFound" */ 'pages/NotFound')
    ),
    metaInfo: {
      title: 'NotFound',
      description: 'NotFound Page',
    },
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   Component: About,
  //   metaInfo: {
  //     title: 'About',
  //     description: `About ${DESC_SUFFIX}`
  //   }
  // }
];

export const getRouteMetaInfo = (name: string): MetaInfoProps => {
  const route = ROUTES.find((r) => r.name === name);
  return route?.metaInfo ?? {};
};

export const isLocationValidRoute = (pathname: string): boolean => {
  return ROUTES.some((r) => r.path === pathname);
};

export const Routes = () => {
  const location = useLocation();
  return (
    <Layout>
      {/* <MetaInfo /> */}
      <ReactRouter location={location}>
        {ROUTES.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </ReactRouter>
    </Layout>
  );
};
