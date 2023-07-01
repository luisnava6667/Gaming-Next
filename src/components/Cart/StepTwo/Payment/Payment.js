import styles from './Payment.module.scss'
import { CardElement } from '@stripe/react-stripe-js'

export function Payment() {
  const cardStyle = {
    style: {
      base: {
        color: '#fff',
        fontSize: '18px',
        "::placeholder": {
          color: '#909090'
        }
      }
    }
  }
  return (
    <div className={styles.payment}>
      <h2>Método de Pago</h2>
      <div className={styles.block}>
        <CardElement options={cardStyle} />
      </div>
    </div>
  )
}
