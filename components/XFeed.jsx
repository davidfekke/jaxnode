const PROFILE_URL = 'https://x.com/jaxnode';

function formatPostDate(ms) {
  if (!ms) {
    return '';
  }
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(ms));
}

export default function XFeed({ posts = [] }) {
  return (
    <aside className="card twitter-panel x-panel">
      <div className="x-panel__header">
        <div>
          <p className="meeting__kicker">Latest on X</p>
          <h2>@jaxnode</h2>
        </div>
        <a href={PROFILE_URL} className="btn btn--ghost" target="_blank" rel="noopener">Follow</a>
      </div>
      {posts.length > 0 ? (
        <ul className="x-feed">
          {posts.map((post) => (
            <li key={post.id}>
              <a className="x-post" href={post.url} target="_blank" rel="noopener">
                <p>{post.text}</p>
                {post.createdAt ? (
                  <time dateTime={new Date(post.createdAt).toISOString()}>
                    {formatPostDate(post.createdAt)}
                  </time>
                ) : null}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="x-panel__fallback">
          Posts from X are unavailable right now.{' '}
          <a href={PROFILE_URL} target="_blank" rel="noopener">View @jaxnode on X</a>.
        </p>
      )}
    </aside>
  );
}
