import { Container } from '../Layout'
import styles from './Footer.module.css'

export default function Footer () {
  return (
    <footer className={styles.footer} data-testid='footer'>
      <Container>
        <iframe
          className={styles['footer-social']}
          src='https://ghbtns.com/github-btn.html?user=belcurv&amp;repo=pfapp-nextjs&amp;type=watch&amp;count=true'
          allowtransparency='true'
          scrolling='0'
          frameBorder='0'
        />

        <p className={styles['footer-credit']}>
          pfapp-nextjs v0.0.0 : : by <a href='https://github.com/belcurv/pfapp-nextjs' target='_blank' rel='noreferrer'>belcurv</a>
        </p>

        <p className={styles['footer-credit']}>
          Source code released under the <a href='https://github.com/belcurv/pfapp/blob/master/license' target='_blank' rel='noreferrer'>MIT license</a>.
          Website and documentation licensed under <a href='https://creativecommons.org/licenses/by/4.0/' target='_blank' rel='noreferrer'>CC BY 4.0</a>.
        </p>
      </Container>
    </footer>
  )
}
