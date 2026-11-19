import Link from 'next/link';
import appdata from '../../data/apps.json';

export const metadata = {
  title: 'JaxNode User Group Apps'
};

export default function Apps() {
  return (
    <>
      <section className="page-intro">
        <p className="eyebrow">Projects</p>
        <h1>JaxNode User Group Apps</h1>
        <p>Apps and tools built around the JaxNode community.</p>
      </section>

      <div className="app-grid">
        {appdata.map((app) => (
          <Link className="app-card" href={`/apps/${app.title}`} key={app.title}>
            <h2>{app.title}</h2>
            <p>{app.description}</p>
          </Link>
        ))}
      </div>
    </>
  );
}