import Link from 'next/link'
import { useRouter } from 'next/router'
import cn from 'classnames'
import styles from './ActiveLink.module.css'

export default function ActiveLink ({ children, href, className, ...props }) {
  const router = useRouter()

  const isActiveLink = router.pathname === href

  return (
    <Link href={href}>
      <a
        {...props}
        className={cn({
          [styles['link-active']]: isActiveLink
        }, className)}
      >
        {children}
      </a>
    </Link>
  )
}
