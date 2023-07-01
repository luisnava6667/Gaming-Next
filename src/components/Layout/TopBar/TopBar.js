import { Image } from 'semantic-ui-react'
import Link from 'next/link'
import styles from './TopBar.module.scss'
import { Menu, Account } from '../'
export function TopBar(props) {
  const { isOpenSearch } = props
  return (
    <div className={styles.topBar}>
      <div className={styles.left}>
        <Link href='/'>
          <Image src='/images/logo.png' alt='Gaming' />
        </Link>
      </div>
      <div className={styles.center}>
        <Menu isOpenSearch={isOpenSearch}/>
      
      </div>
      <div className={styles.right}>
        <Account />
      </div>
    </div>
  )
}
