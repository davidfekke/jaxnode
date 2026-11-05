import { notFound } from 'next/navigation';
import CodeView from '../../components/CodeView';
import { getCodePage } from '../../lib/codepage';

export const metadata = {
  title: 'Jax Node GitHub code'
};

export default async function Code() {
  const data = await getCodePage(0);
  if (!data.inRange) {
    notFound();
  }
  return <CodeView {...data} />;
}