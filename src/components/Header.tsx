import React from 'react'
import Link from 'next/link'

export default function Header(): JSX.Element {
  return (
    <header className="site-header">
      <div className="site-header__wrapper">
        <div className="logo">
          <Link href="/">LH</Link>
        </div>
        <nav className="nav">
          <ul className="nav__wrapper">
            <li className="nav__item">
              <Link href="/">WORK</Link>
            </li>
            <li className="nav__item">
              <Link href="/lab">LAB</Link>
            </li>
            <li className="nav__item">
              <Link href="/article">ARTICLE</Link>
            </li>
            <li className="nav__item">
              <Link href="/info">INFO</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
