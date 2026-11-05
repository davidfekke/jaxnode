'use client';

export default function Error({ error, reset }) {
  return (
    <section className="error-page">
      <h1>{error.message || 'Something went wrong'}</h1>
      <h2>{error.digest}</h2>
      <pre>{error.stack}</pre>
      <button onClick={reset}>Try again</button>
    </section>
  );
}