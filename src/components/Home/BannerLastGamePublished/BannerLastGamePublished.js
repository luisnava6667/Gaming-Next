import { useEffect, useState } from 'react'
import styles from './BannerLastGamePublished.module.scss'
import { Game } from '@/api'
import { DateTime } from 'luxon'
import { Container, Image } from 'semantic-ui-react'
import Link from 'next/link'
import { fn } from '@/utils'
import { Label } from '@/components/Shared'
const gameCtrl = new Game()
export function BannerLastGamePublished() {
  const [game, setgame] = useState(null)
  useEffect(() => {
    ;(async () => {
      try {
        const response = await gameCtrl.getLastPublished()
        setgame(response.data[0])
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])
  if (!game) return null
  const wallpaper = game.attributes.wallpaper
  const realaseDate = new Date(game.attributes.releaseDate).toISOString()
  const price = fn.calcDiscountedPrice(
    game.attributes.price,
    game.attributes.discount
  )

  return (
    <div className={styles.container}>
      <Image
        src={wallpaper?.data.attributes.url}
        className={styles.wallpaper}
      />
      <Link href={game.attributes.slug} className={styles.infoContainer}>
        <Container>
          <span className={styles.date}>
            {DateTime.fromISO(realaseDate).minus({ days: 1 }).toRelative()}
          </span>
          <h2>{game.attributes.title}</h2>
          <p className={styles.price}>
            <Label.Discount>-{game.attributes.discount}%</Label.Discount>
            <span className={styles.finalPrice}>{price}USD</span>
          </p>
        </Container>
      </Link>
    </div>
  )
}
