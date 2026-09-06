export const metadata = {
  title: 'JaxNode Videos'
};

export default function Video() {
  return (
    <>
      <section className="page-intro">
        <p className="eyebrow">Watch</p>
        <h1>JaxNode Videos</h1>
      </section>
      <script async src="https://cdn.jsdelivr.net/npm/@mux/mux-player" />
      <mux-player
        playback-id="NT9yaVddmwM9y67OB01zYhBSJm00a2zRuYX00GqIzWQayQ"
        metadata-video-title="Test VOD"
        metadata-viewer-user-id="user-jaxnode"
      />
    </>
  );
}