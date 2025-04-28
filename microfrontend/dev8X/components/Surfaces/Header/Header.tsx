import React from 'react';

import styles from './index.module.css';

export default function Header() {
  return (
    <>
      <header>
        <div className={styles['header__inner']}>
          <a href="/" className={styles['header__logo']}>
            <span className={styles['hidden']}>Home</span>
            <img className="mx-auto h-6 lg:h-8" src="/logo.png" alt="Dev8X" />
          </a>
          <nav className={styles['menu']}>
            <ul className={styles['menu__list']}>
              <li className={styles['menu__item']}>
                <a className={`${styles['menu__link']} ${styles['menu__link--active']}`}>Home</a>
              </li>
              <li className={styles['menu__item']}>
                <a className={styles['menu__link']}>About</a>
              </li>
              <li className={styles['menu__item']}>
                <a className={styles['menu__link']}>Work</a>
              </li>
              <li className={styles['menu__item']}>
                <a className={styles['menu__link']}>Expertise</a>
              </li>
              <li className={styles['menu__item']}>
                <a className={styles['menu__link']}>Contact</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
