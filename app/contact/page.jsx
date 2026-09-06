import Script from 'next/script';

export const metadata = {
  title: 'Contact the Jax Node User Group'
};

const twitterWidgetsScript = `!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');`;

export default function Contact() {
  return (
    <>
      <section className="page-intro">
        <p className="eyebrow">Get in touch</p>
        <h1>Contact the Jax Node User Group</h1>
        <p>
          If you are interested in coming to our meetings or contacting our organizers,
          please go to our <a href="https://meetup.com/Jax-Node-js-UG/">Meetup page</a>.
        </p>
        <p>You can also follow us on X and GitHub.</p>
        <div className="actions">
          <a href="https://meetup.com/Jax-Node-js-UG/" className="btn">Meetup</a>
          <a href="https://twitter.com/jaxnode" className="btn btn--ghost">@jaxnode</a>
          <a href="https://github.com/jaxnode" className="btn btn--ghost">GitHub</a>
        </div>
        <div className="social-row">
          <a href="https://twitter.com/jaxnode" className="twitter-follow-button" data-show-count="false" data-size="large">Follow @jaxnode</a>
          <a className="github-button" href="https://github.com/jaxnode" data-style="mega" data-count-href="/jaxnode/followers" data-count-api="/users/jaxnode#followers" data-count-aria-label="# followers on GitHub" aria-label="Follow @jaxnode on GitHub" suppressHydrationWarning>Follow @jaxnode</a>
        </div>
      </section>
      <Script id="twitter-follow" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: twitterWidgetsScript }} />
      <Script id="github-bjs" src="https://buttons.github.io/buttons.js" strategy="afterInteractive" />
    </>
  );
}