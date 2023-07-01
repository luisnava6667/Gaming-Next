import { useState, useEffect } from 'react'
import { Wishlist as WishlistAPI } from '@/api'
import { size } from 'lodash'
import { NoResult } from '@/components/Shared'
import { useAuth } from '@/hooks'
import { GridGames } from './GridGames'
const WishlistCtrl = new WishlistAPI()
export function Wishlist() {
  const [wishlist, setWishlist] = useState(null)
  const [reload, setReload] = useState(false)
  const { user } = useAuth()
  const onReload = () => setReload((prevState) => !prevState)
  useEffect(() => {
    ;(async () => {
      try {
        const response = await WishlistCtrl.getAll(user.id)
        setWishlist(response)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [reload])
  return size(wishlist) === 0 ? (
    <NoResult title='No hay juegos en tu lista de deseos' />
  ) : (
    <GridGames wishlist={wishlist} onReload={onReload} />
  )
}
