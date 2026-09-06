import { getSponsors } from '../../lib/sponsordata';

export const metadata = {
  title: 'Sponsors'
};

export default function Sponsors() {
  const sponsors = getSponsors();

  return (
    <>
      <section className="page-intro">
        <p className="eyebrow">Community partners</p>
        <h1>Sponsors</h1>
        <p>We are looking for sponsors. Please contact David Fekke at gmail dot com if you would like to help sponsor meetings.</p>
        <p><em>We would like to thank our current sponsors.</em></p>
      </section>

      <div className="sponsor-grid">
        {sponsors.map((sponsor) => (
          <article className="sponsor-card" key={sponsor.name}>
            <a href={sponsor.url} target="_blank" rel="noopener">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={sponsor.alt} src={sponsor.imagepath} />
            </a>
            <h2>{sponsor.name}</h2>
            <p>{sponsor.message}</p>
          </article>
        ))}
      </div>
    </>
  );
}