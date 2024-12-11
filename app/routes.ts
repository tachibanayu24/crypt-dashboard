import { index, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('routes/index/route.tsx'),

  // ...prefix('api', [route('get-kline', 'routes/api/get-kline/server.ts')]),
] satisfies RouteConfig;
