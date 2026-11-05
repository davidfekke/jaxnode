import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: {
    default: 'JaxNode User Group'
  },
  description: 'The Jacksonville Node.js and JavaScript User Group. Meetups, talks, and community for anyone interested in JavaScript.',
  authors: [{ name: 'JaxNode User Group' }],
  icons: {
    icon: '/images/favicon.ico'
  },
  other: {
    'theme-color': '#84bf4d',
    'apple-itunes-app': 'app-id=1183086193'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Instrument+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
        <link href="/css/jaxnode.css" rel="stylesheet" />
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        <main id="main" className="site-main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}