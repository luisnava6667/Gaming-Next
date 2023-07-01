import Link from 'next/link'
import styles from './GridGames.module.scss'
import { map } from 'lodash'
import { fn } from '@/utils'
import { Label } from '../Label'
export function GridGames(props) {
  const { games } = props
  return (
    <div className={styles.gridGames}>
      {map(games, (game) => (
        <Link
          key={game.id}
          href={`/${game.attributes.slug}`}
          className={styles.games}>
          <div>
            <img src={game.attributes.cover.data.attributes.url} alt='' />
            {game.attributes.discount > 0 && (
              <Label.Discount className={styles.discount}>
                -{`${game.attributes.discount}`}%
              </Label.Discount>
            )}
          </div>
          <div>
            <span>{game.attributes.title}</span>
            <span className={styles.price}>
              {fn.calcDiscountedPrice(
                game.attributes.price,
                game.attributes.discount
              )}USD
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
