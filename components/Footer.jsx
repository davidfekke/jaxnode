import Link from 'next/link';
import { version } from '../package.json';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p>
          Copyright {year}, Jax Node User Group. Version {version}.
        </p>
        <div className="footer-links">
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
          <a target="_blank" href="https://nodejs.org" rel="noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://img.shields.io/badge/node-${process.version}-brightgreen.svg`}
              alt={`Running on Node ${process.version}`}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}