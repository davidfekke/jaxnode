import { notFound } from 'next/navigation';
import appdata from '../../../data/apps.json';

export async function generateMetadata({ params }) {
  const { name } = await params;
  const selectedApp = appdata.filter((n) => n.title === name)[0];
  return { title: selectedApp ? selectedApp.title : '404 Error' };
}

export default async function AppDetail({ params }) {
  const { name } = await params;
  const selectedApp = appdata.filter((n) => n.title === name)[0];
  if (selectedApp === undefined) {
    notFound();
  }

  return (
    <article>
      <section className="page-intro">
        <p className="eyebrow">App</p>
        <h1>{selectedApp.title}</h1>
      </section>
      <div className="detail-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt={selectedApp.title} src={selectedApp.heroimage} />
      </div>
      <div className="prose">
        <p>{selectedApp.description}</p>
        <h2>GitHub</h2>
        <p>
          <a href={selectedApp.githuburl} target="_blank" rel="noopener" data-popup="true">{selectedApp.githuburl}</a>
        </p>
        <h2>How to install</h2>
        <div className="store-badges">
          {selectedApp.displayappstore && (
            <a href={selectedApp.installurl} target="_blank" rel="noopener" data-popup="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/apple.png+@2x.png" alt="Download on the App Store" />
            </a>
          )}
          {selectedApp.displaygoogleplay && (
            <a href={selectedApp.installurl} target="_blank" rel="noopener" data-popup="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/google.png+@2x.png" alt="Get it on Google Play" />
            </a>
          )}
        </div>
        <p>
          Install {selectedApp.title} by going to this <a href={selectedApp.installurl} target="_blank" rel="noopener" data-popup="true">page</a>.
        </p>
        <p className="install">{selectedApp.howtoinstall}</p>
      </div>
    </article>
  );
}