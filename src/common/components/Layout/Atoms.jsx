import cn from 'classnames'
import styles from './Layout.module.css'

export const Container = ({ children, className }) => (
  <div className={cn('container', className)}>
    {children}
  </div>
)

export const Main = ({ children, className }) => (
  <div className={cn(styles.main, className)}>
    {children}
  </div>
)
