import type { Route } from './+types/route';

export function meta() {
  return [{ title: 'Crypt dashboard' }, { name: 'description', content: 'My crypt dashboard' }];
}

export { clientLoader } from '../api/get-kline/server';

export default function Home({ loaderData }: Route.ComponentProps) {
  const data = loaderData;

  console.log(data);

  return <div>{JSON.stringify(data, null, 2)}</div>;
}
