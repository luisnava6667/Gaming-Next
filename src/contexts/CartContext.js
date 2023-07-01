import { createContext, useState, useEffect } from 'react'
import { Cart } from '@/api'
const cartCtrl = new Cart()
export const CartContext = createContext()

export function CartProvider(props) {
  const { children } = props
  const [cart, setCart] = useState(null)
  const [total, setTotal] = useState(cartCtrl.count())

  useEffect(() => {
    const response = cartCtrl.getAll()
    setCart(response)
  }, [])
  const addCart = (gameID) => {
    cartCtrl.add(gameID)
    refreshTotalCart()
  }
  const changeQuantityItem = (gameID, quantity) => {
    cartCtrl.changeQuantity(gameID, quantity)
    refreshTotalCart()
  }
  const deleteItem = (gameID) => {
    cartCtrl.delete(gameID)
    refreshTotalCart()
  }
  const deleteAllItem = () => {
    cartCtrl.deleteAll()
    refreshTotalCart()
  }
  const refreshTotalCart = () => {
    setTotal(cartCtrl.count())
    setCart(cartCtrl.getAll())
  }
  const data = {
    cart,
    addCart,
    total,
    deleteItem,
    deleteAllItem,
    changeQuantityItem
  }

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>
}
