import styles from './Resume.module.scss'
import { useState, use, useEffect } from 'react'
import { forEach, map, set } from 'lodash'
import { Button } from 'semantic-ui-react'
import { useAuth, useCart } from '@/hooks'
import { Cart } from '@/api'
import { fn } from '@/utils'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useRouter } from 'next/router'

const cartCtrl = new Cart()
export function Resume(props) {
  const { games, addressSelected } = props
  const [total, setTotal] = useState(null)
  const [loading, setLoading] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const { user } = useAuth()
  const { deleteAllItem } = useCart()
  const router = useRouter()
  useEffect(() => {
    let totalTemp = 0
    forEach(games, (game) => {
      const price = fn.calcDiscountedPrice(
        game.attributes.price,
        game.attributes.discount
      )
      totalTemp += price * game.quantity
    })
    setTotal(totalTemp.toFixed(2))
  }, [games])
  const onPay = async () => {
    setLoading(true)
    if (!stripe || !elements) {
      setLoading(false)
      return
    }
    const cardElement = elements.getElement(CardElement)
    const result = await stripe.createToken(cardElement)
    if (result.error) {
      console.log(result.error.message)
    } else {
      const response = await cartCtrl.paymentCart(
        result.token,
        games,
        user.id,
        addressSelected
      )
      if (response.status === 200) {
        deleteAllItem()
        goToStepEnd()
      } else {
        console.error('Error al realizar el pago')
      }
    }
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }
  const goToStepEnd = () => {
    router.replace({ query: { ...router.query, step: 3 } })
  }
  if (!total) return null
  return (
    <div className={styles.resume}>
      <h2>Resumen</h2>
      <div className={styles.block}>
        <div className={styles.products}>
          {map(games, (game) => (
            <div className={styles.product} key={game.id}>
              <div>
                <p>{game.attributes.title}</p>
                <p>{game.attributes.platform.data.attributes.title}</p>
              </div>
              <span>
                {game.quantity > 0 &&
                  `${game.quantity} x $${fn.calcDiscountedPrice(
                    game.attributes.price,
                    game.attributes.discount
                  )}`}{' '}
                USD
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.blockTotal}>
        <div>
          <span>Total</span>
          <span>{total}USD</span>
        </div>
        <Button
          primary
          fluid
          disabled={!addressSelected}
          onClick={onPay}
          loading={loading}>
          Pagar
        </Button>
      </div>
    </div>
  )
}
