import { forEach, map } from 'lodash'
import styles from './Order.module.scss'
import { useState } from 'react'
import { Image } from 'semantic-ui-react'
import { DateTime } from 'luxon'
import { BasicModal } from '@/components/Shared'
import { fn } from '@/utils'
export function Order(props) {
  const { order } = props
  const [showModal, setShowModal] = useState(false)

  const createdAt = new Date(order.attributes.createdAt).toISOString()
  const products = order.attributes.products
  const address = order.attributes.addressShipping
  const openCloseModal = () => setShowModal((prevState) => !prevState)
  const getTotalProducts = () => {
    let total = 0
    forEach(products, (product) => {
      total += product.quantity
    })
    return total
  }
  return (
    <>
      <div className={styles.order} onClick={openCloseModal}>
        <div>
          <span>
            {DateTime.fromISO(createdAt, { locale: 'es' }).toFormat(
              'dd/MM/yyyy'
            )}
          </span>
          <p>{getTotalProducts()} Productos</p>
        </div>
        <p>{order.attributes.totalPayment.toFixed(2)} USD</p>
      </div>
      <BasicModal
        show={showModal}
        onClose={openCloseModal}
        title='Informacion del pedido'>
        {map(products, (product) => (
          <div className={styles.product}>
            <Image src={product.attributes.cover.data.attributes.url} />
            <div>
              <div className={styles.info}>
                <p>{product.attributes.title}</p>
                <p>{product.attributes.platform.data.attributes.title}</p>
              </div>
              <div className={styles.quantity}>
                <span>X{product.quantity}</span>
                <span>
                  {fn.calcDiscountedPrice(
                    product.attributes.price,
                    product.attributes.discount
                  )}
                  USD
                </span>
              </div>
            </div>
          </div>
        ))}
        <div className={styles.address}>
          <div>
            <p className={styles.title}>{address.attributes.title}</p>
            <p className={styles.addressInfo}>
              {address.attributes.name}, {address.attributes.address},{' '}
              {address.attributes.state}, {address.attributes.city}, ,
              {address.attributes.postal_code}
            </p>
          </div>
        </div>
        <div className={styles.total}>
            <p>Total: {order.attributes.totalPayment.toFixed(2)}USD</p>
        </div>
      </BasicModal>
    </>
  )
}
