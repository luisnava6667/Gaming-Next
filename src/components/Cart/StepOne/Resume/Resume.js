import { useEffect, useState } from 'react'
import styles from './Resume.module.scss'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Button } from 'semantic-ui-react'
import { forEach } from 'lodash'
import { fn } from '@/utils'
export function Resume(props) {
  const { games } = props
  const router = useRouter()
  const [totals, setTotals] = useState(null)

  useEffect(() => {
    let totals = {
      original: 0,
      discount: 0,
      price: 0
    }
    forEach(games, (game) => {
      const price = fn.calcDiscountedPrice(
        game.attributes.price,
        game.attributes.discount
      )
      totals = {
        original: totals.original + game.attributes.price * game.quantity,
        discount:
          totals.discount + (game.attributes.price - price) * game.quantity,
        price: totals.price + price * game.quantity
      }
    })
    setTotals(totals)
  }, [games])
  if (!totals) return null
  const goToStepTwo = () => {
    router.replace({ query: { ...router.query, step: 2 } })
  }
  return (
    <div className={styles.resumen}>
      <h2>Resumen</h2>
      <div className={styles.block}>
        <div className={styles.prices}>
          <div>
            <span>Precio Oficial: </span>
            <span>{totals.original.toFixed(2)} USD</span>
          </div>
          <div>
            <span>Precio Descuento: </span>
            <span>{totals.discount.toFixed(2)} USD</span>
          </div>
          <div>
            <span>Precio Subtotal: </span>
            <span>{totals.price.toFixed(2)} USD</span>
          </div>
        </div>
        <Button primary fluid onClick={goToStepTwo}>
          Proceder con el pago
        </Button>
        <Link href='/' className={styles.link}>Continuar comprando</Link>
      </div>
    </div>
  )
}
