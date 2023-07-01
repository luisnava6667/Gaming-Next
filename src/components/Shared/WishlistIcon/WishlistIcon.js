import classNames from 'classnames'
import styles from './WishlistIcon.module.scss'
import { Wishlist } from '@/api'
import { Icon } from 'semantic-ui-react'
import { useAuth } from '@/hooks'
import { useEffect, useState } from 'react'
const wishlistCtrl = new Wishlist()
export function WishlistIcon(props) {
  const { gameId, className, removeCallback } = props
  const { user } = useAuth()
  const [hasWishList, setHasWishList] = useState(null)
  useEffect(() => {
    ;(async () => {
      try {
        const response = await wishlistCtrl.check(user.id, gameId)
        setHasWishList(response)
      } catch (error) {
        setHasWishList(false)
        console.error(error)
      }
    })()
  }, [gameId])
  const addWishList = async () => {
    const response = await wishlistCtrl.add(user.id, gameId)
    setHasWishList(response)
  }
  const removeWishList = async () => {
    try {
      await wishlistCtrl.delete(hasWishList.id)
      setHasWishList(false)
      if (removeCallback) {
        removeCallback()
      }
    } catch (error) {
      console.error(error)
    }
  }
  if (hasWishList === null) return null
  return (
    <Icon
      name={hasWishList ? 'heart' : 'heart outline'}
      onClick={hasWishList ? removeWishList : addWishList}
      className={classNames(styles.wishlistIcon, {
        [className]: className
      })}
    />
  )
}
