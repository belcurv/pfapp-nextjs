import cn from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import styles from './Section.module.css'

export const SectionContainer = ({ className, children }) => (
  <section className={cn(styles.section, className)}>
    <div className='content-box'>
      {children}
    </div>
  </section>
)

export const SectionHeader = ({ title, onSaveClick, onDeleteClick }) => (
  <div className='grid'>

    <div className='grid__cell'>
      <h1 className={styles.section__title}>{title}</h1>
    </div>

    <div>
      <h2
        className={cn(
          styles.section__title,
          styles['section-header__button']
        )}
        title='Save your input data'
        onClick={onSaveClick}
      >
        <FontAwesomeIcon icon={faFloppyDisk} />
      </h2>
      <h2
        className={cn(
          styles.section__title,
          styles['section-header__button']
        )}
        title='Erase your input data'
        onClick={onDeleteClick}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </h2>
    </div>

  </div>
)

export const SubSectionHeader = ({ title, children }) => (
  <div className='grid'>

    <div className='grid__cell'>
      <h4 className={styles['sub-section__title']}>{title}</h4>
    </div>

    <div className={styles['sub-section__title']}>
      {children}
    </div>

  </div>
)
