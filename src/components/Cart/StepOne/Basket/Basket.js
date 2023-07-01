import styles from './Basket.module.scss'
import { Image, Icon, Dropdown } from 'semantic-ui-react'
import { map } from 'lodash'
import { fn } from '@/utils'
import { useCart } from '@/hooks'
export function Basket(props) {
  const { games } = props
  const { changeQuantityItem, deleteItem } = useCart()
  const options = Array.from({ length: 15 }, (_, index) => {
    const number = index + 1
    return { key: number, text: String(number), value: number }
  })
  return (
    <div className={styles.basket}>
      <h2>Cesta</h2>
      <div className={styles.block}>
        {map(games, (game) => (
          <div className={styles.product} key={game.id}>
            <Image src={game.attributes.cover.data.attributes.url} />
            <div>
              <div className={styles.info}>
                <div>
                  <p>{game.attributes.title}</p>
                  <p>{game.attributes.platform.data.attributes.title}</p>
                </div>
                <Icon
                  name='trash alternate outline'
                  link
                  onClick={() => deleteItem(game.id)}
                />
              </div>
              <div className={styles.quantity}>
                <Dropdown
                  className='number'
                  options={options}
                  selection
                  value={game.quantity}
                  compact
                  onChange={(_, data) =>
                    changeQuantityItem(game.id, data.value)
                  }
                />
                <span>
                  {fn.calcDiscountedPrice(
                    game.attributes.price,
                    game.attributes.discount
                  )}{' '}
                  USD
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
