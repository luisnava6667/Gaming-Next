import { Button,Icon } from 'semantic-ui-react'
import Link from 'next/link'
import styles from './StepThree.module.scss'
export  function StepThree() {
  return (
    <div className={styles.stepThree}>
      <Icon name="check circle outline" />
      <h2>¡Todo listo!</h2>
      <Button as={Link} href="/account" primary>Ver Pedido</Button>
    </div>
  )
}
