'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/apps', label: 'Apps' },
  { href: '/contact', label: 'Contact' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/code', label: 'Code' }
];

function isActive(pathname, href) {
  if (href === '/') {
    return pathname === '/';
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();

  useEffect(() => {
    const header = document.querySelector('.site-header');
    const toggle = document.querySelector('.nav-toggle');
    if (!header || !toggle) {
      return undefined;
    }
    const onClick = () => {
      const open = header.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    toggle.addEventListener('click', onClick);
    return () => toggle.removeEventListener('click', onClick);
  }, []);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/jaxnode.png" alt="JaxNode" />
        </Link>
        <button type="button" className="nav-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu">
          <span />
        </button>
        <nav id="site-nav" className="site-nav" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(pathname, item.href) ? 'nav-link is-active' : 'nav-link'}
              aria-current={isActive(pathname, item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
          <a className="github-link" href="https://github.com/davidfekke/jaxnode" aria-label="JaxNode on GitHub">
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85 0 1.71.12 2.51.34 1.9-1.32 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.38-.01 2.49-.01 2.83 0 .27.18.6.69.49A10.04 10.04 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  );
}