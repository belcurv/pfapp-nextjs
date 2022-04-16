import Link from 'next/link'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFireFlameCurved, faRoad, faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import styles from './Header.module.css'

// DOM

export default function Header () {
  const { pathname } = useRouter()

  const isActiveLink = (url) => pathname === url ? styles['link-active'] : ''

  return (
    <header className={styles.header}>
      <div className='container'>
        <div className='grid'>

          <div className='grid-cell'>
            <Link href='/'>
              <a title='Home' aria-label='Home nav link'>
                <h1 className={isActiveLink('/')}>
                  pfapp
                </h1>
              </a>
            </Link>
          </div>

          <nav className={`${styles.nav} grid-cell grid-cell--autoSize`}>

            <div className={styles.navIcons}>
              <Link href='/fire-calc'>
                <a
                  title='Financial Independence / Retire Early Calculator'
                  className={isActiveLink('/fire-calc')}
                  aria-label='FIRE Calculator nav link'
                >
                  <FontAwesomeIcon icon={faFireFlameCurved} />
                </a>
              </Link>
              <Link href='/commute-calc'>
                <a
                  title='Cost of Commuting Calculator'
                  className={isActiveLink('/commute-calc')}
                  aria-label='Commute Calc nav link'
                >
                  <FontAwesomeIcon icon={faRoad} />
                </a>
              </Link>
              <Link href='/portfolio'>
                <a
                  title='Portfolio Tracker'
                  className={isActiveLink('/portfolio')}
                  aria-label='Portfolio nav link'
                >
                  <FontAwesomeIcon icon={faFolderOpen} />
                </a>
              </Link>
            </div>

            <div className={styles.navText}>
              <Link href='/fire-calc'>
                <a title='Financial Independence / Retire Early Calculator' aria-label='FIRE Calculator nav link'>
                  <h4 className={isActiveLink('/fire-calc')}>FIRE Calculator</h4>
                </a>
              </Link>
              <Link href='/commute-calc'>
                <a title='Cost of Commuting Calculator' aria-label='Commute Calc nav link'>
                  <h4 className={isActiveLink('/commute-calc')}>Commute Calculator</h4>
                </a>
              </Link>
              <Link href='/portfolio'>
                <a title='Portfolio Tracker' aria-label='Portfolio nav link'>
                  <h4 className={isActiveLink('/portfolio')}>Portfolio</h4>
                </a>
              </Link>
            </div>

          </nav>
        </div>
      </div>
    </header>
  )
}
