import Pager from './Pager';

export default function CodeView({ repos, currPage, pageCount }) {
  return (
    <>
      <section className="page-intro">
        <p className="eyebrow">Open source</p>
        <h1>Jax Node GitHub code</h1>
        <p>
          If you are interested in seeing code from some of our presentations, please go to our{' '}
          <a href="https://github.com/jaxnode/">GitHub page</a>.
        </p>
      </section>

      <Pager currPage={currPage} pageCount={pageCount} />
      <div className="repo-list">
        {repos.map((repo) => (
          <article className="repo-card" key={repo.id}>
            <h2>{repo.name}</h2>
            <p><a href={repo.html_url}>{repo.html_url}</a></p>
            <p>{repo.description}</p>
            <p>Install this repo by typing the following command in your terminal</p>
            <p className="install">git clone {repo.clone_url}</p>
            <div className="meta-row">
              <span className="chip">Default branch: {repo.default_branch}</span>
              <span className="chip">Language: {repo.language}</span>
            </div>
          </article>
        ))}
      </div>
      <Pager currPage={currPage} pageCount={pageCount} />
    </>
  );
}