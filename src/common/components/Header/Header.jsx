import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFireFlameCurved, faRoad, faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { Container } from '@/common/components/Layout'
import ActiveLink from '@/common/components/ActiveLink'
import styles from './Header.module.css'

// Constants

const navLinks = [
  {
    id: 'FIRE_CALCULATOR',
    href: '/fire-calc',
    label: 'FIRE Calculator',
    title: 'Financial Independence / Retire Early Calculator',
    aria: 'FIRE Calculator nav link',
    icon: faFireFlameCurved
  },
  {
    id: 'COMMUTE_CALCULATOR',
    href: '/commute-calc',
    label: 'Commute Calculator',
    title: 'Cost of Commuting Calculator',
    aria: 'Commute Calc nav link',
    icon: faRoad
  },
  {
    id: 'PORTFOLIO',
    href: '/portfolio',
    label: 'Portfolio',
    title: 'Portfolio Tracker',
    aria: 'Portfolio nav link',
    icon: faFolderOpen
  }
]

// DOM

export default function Header () {
  return (
    <header className={styles.header}>
      <Container>
        <div className='grid'>

          <div className='grid__cell'>
            <ActiveLink href='/' title='Home' aria-label='Home nav link'>
              <h1>pfapp</h1>
            </ActiveLink>
          </div>

          <nav className={`${styles.nav} grid__cell grid__cell--autoSize`}>

            <div className={styles.nav__icons} data-testid='header-nav-icons'>
              {navLinks.map(link => (
                <ActiveLink
                  key={link.id}
                  href={link.href}
                  title={link.title}
                  aria-label={link.aria}
                >
                  <FontAwesomeIcon icon={link.icon} />
                </ActiveLink>
              ))}
            </div>

            <div className={styles.nav__text} data-testid='header-nav-text'>
              {navLinks.map(link => (
                <ActiveLink
                  key={link.id}
                  href={link.href}
                  title={link.title}
                  aria-label={link.aria}
                >
                  <h4>{link.label}</h4>
                </ActiveLink>
              ))}
            </div>

          </nav>
        </div>
      </Container>
    </header>
  )
}
