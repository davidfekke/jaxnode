import { notFound } from 'next/navigation';
import CodeView from '../../../components/CodeView';
import { getCodePage } from '../../../lib/codepage';

export const metadata = {
  title: 'Jax Node GitHub code'
};

export default async function CodePage({ params }) {
  const { page } = await params;
  const pageNum = page && !isNaN(page) ? parseInt(page, 10) : 0;
  const data = await getCodePage(pageNum);
  if (!data.inRange) {
    notFound();
  }
  return <CodeView {...data} />;
}