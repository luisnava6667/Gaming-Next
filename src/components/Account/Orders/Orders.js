import { useState, useEffect } from 'react'
import { Order } from '@/api'
import { Order as OrderItem } from './Order'
import { map } from 'lodash'
import { NoResult } from '@/components/Shared'
import { useAuth } from '@/hooks'
const orderCtrl = new Order()

export function Orders() {
  const [orders, setOrders] = useState(null)
  const { user } = useAuth()
  useEffect(() => {
    ;(async () => {
      try {
        const response = await orderCtrl.getAll(user.id)
        setOrders(response.data)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])
  if (!orders) return <NoResult text='No tiene ningun producto comprado' />
  return (
    <div>
 {
    map(orders, (order) => (
        <OrderItem key={order.id} order={order} />
    ))
 }
    </div>
  )
}
