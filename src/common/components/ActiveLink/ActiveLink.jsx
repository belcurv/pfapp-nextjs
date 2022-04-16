import { useRouter } from 'next/router'
import cn from 'classnames'
import styles from './ActiveLink.module.css'

export default function ActiveLink ({ children, href, ...props }) {
  const router = useRouter()

  const isActiveLink = router.pathname === href

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a
      {...props}
      href={href}
      onClick={handleClick}
      className={cn({
        [styles['link-active']]: isActiveLink
      })}
    >
      {children}
    </a>
  )
}
