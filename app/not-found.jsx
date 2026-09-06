export const metadata = {
  title: '404 Error'
};

export default function NotFound() {
  return (
    <section className="error-page">
      <p className="eyebrow">Lost in the modules</p>
      <h1>404 Error</h1>
      <p>This page does not exist. Move along.</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/404image.jpg" alt="404 image" />
    </section>
  );
}