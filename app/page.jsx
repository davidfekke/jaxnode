import Script from 'next/script';
import XFeed from '../components/XFeed';
import { getNextMeetup } from '../lib/meetupdata';
import { getJaxnodePosts } from '../lib/xdata';

export const metadata = {
  title: 'JaxNode User Group'
};

export default async function Home() {
  const meeting = await getNextMeetup();
  const posts = await getJaxnodePosts();
  const displayMeetup = meeting !== undefined && Object.keys(meeting).length !== 0;
  let displayMap = false;
  if (displayMeetup && Object.prototype.hasOwnProperty.call(meeting, 'venue')) {
    displayMap = Object.keys(meeting.venue).length !== 0;
  }

  let mapsScript = '';
  if (displayMap) {
    mapsScript = `(function () {\n  function initialize() {\n    var myLatlng = new google.maps.LatLng(${meeting.venue.lat}, ${meeting.venue.lon});\n    var mapOptions = {\n      center: myLatlng,\n      zoom: 15,\n      mapTypeId: google.maps.MapTypeId.ROADMAP\n    };\n    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);\n    var marker = new google.maps.Marker({\n      position: myLatlng,\n      map: map,\n      title: "${meeting.venue.name}"\n    });\n    var infowindow = new google.maps.InfoWindow({\n      content: '<div>${meeting.venue.name}</div>'\n    });\n    google.maps.event.addListener(marker, 'click', function () {\n      infowindow.open(map, marker);\n    });\n  }\n  var tries = 0;\n  function waitForMaps() {\n    if (window.google && window.google.maps) {\n      initialize();\n      return;\n    }\n    if (tries < 100) {\n      tries += 1;\n      window.setTimeout(waitForMaps, 200);\n    }\n  }\n  waitForMaps();\n})();`;
  }

  return (
    <div className="home-grid">
      <div className="stack">
        {displayMeetup && (
          <article className="card meeting">
            <div className="meeting__banner">
              <div>
                <p className="meeting__kicker">Next meeting</p>
                <h2>{meeting.name}</h2>
                <p className="meeting__time">{meeting.time}</p>
              </div>
              <a href={meeting.event_url} data-event={meeting.id} className="btn btn--on-green mu-rsvp-btn">RSVP on Meetup</a>
            </div>
            <div className="meeting__body" id="meeting-description">
              <div dangerouslySetInnerHTML={{ __html: meeting.description }} />
              {displayMap && (
                <div className="venue">
                  <div id="map-canvas" />
                  <div className="venue__card">
                    <strong>{meeting.venue.name}</strong><br />
                    {meeting.venue.address_1}<br />
                    {meeting.venue.city}, {meeting.venue.state} {meeting.venue.zip}
                  </div>
                </div>
              )}
            </div>
          </article>
        )}

        <section className="card hero">
          <div className="hero__pair">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="images/jaxnodejs.png" alt="Jax Node logo" />
            <span className="amp" aria-hidden="true">&amp;</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="images/jaxbeerjs.png" alt="Jax Beer.js logo" />
          </div>

          <p className="eyebrow">Jacksonville JavaScript</p>
          <h1>Welcome to the JaxNode User Group</h1>
          <p className="lede">The Jacksonville Node.js and JavaScript User Group is for anyone interested in learning more about Node.js and JavaScript. JavaScript was originally created for scripting web browsers, but now JavaScript applications run on the server, desktop and even robots.</p>
          <p>Node.js is a JavaScript runtime built on Chrome&apos;s V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.</p>

          <div className="actions">
            <a href="https://www.meetup.com/Jax-Node-js-UG" className="btn">Join our Meetup</a>
            <a href="https://jacksonville-tech.com/" className="btn btn--ghost" target="_blank" rel="noopener">Jacksonville-Tech Slack</a>
          </div>

          <div className="note">
            We also encourage everyone to join the <a href="https://jacksonville-tech.com/" target="_blank" rel="noopener">Jacksonville-Tech Slack group</a>. It is a great place to ask questions and find out what is going on in the local tech community.
          </div>

          <p>Follow us on X or GitHub.</p>
          <div className="social-row">
            <a href="https://x.com/jaxnode" className="btn btn--ghost" target="_blank" rel="noopener">Follow @jaxnode</a>
            <a className="github-button" href="https://github.com/jaxnode" data-style="mega" data-count-href="/jaxnode/followers" data-count-api="/users/jaxnode#followers" data-count-aria-label="# followers on GitHub" aria-label="Follow @jaxnode on GitHub" suppressHydrationWarning>Follow @jaxnode</a>
          </div>
          <div className="store-badges">
            <a href="https://itunes.apple.com/us/app/jaxnode/id1183086193?ls=1&mt=8" target="_blank" rel="noopener" data-popup="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/apple.png+@2x.png" alt="Download on the App Store" />
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.fekke.jnmobile" target="_blank" rel="noopener" data-popup="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/google.png+@2x.png" alt="Get it on Google Play" />
            </a>
          </div>
        </section>
      </div>

      <XFeed posts={posts} />

      {displayMeetup && (
        <Script id="maps-api" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBV9EuRsK_Eg7rzF-zA4ARVrNyPsfKOV_s&sensor=false" strategy="afterInteractive" />
      )}
      {displayMeetup && displayMap && (
        <Script id="maps-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: mapsScript }} />
      )}
      <Script id="github-bjs" src="https://buttons.github.io/buttons.js" strategy="afterInteractive" />
    </div>
  );
}