import { useEffect, useState } from 'react'
import styles from './ListAddresses.module.scss'
import { map } from 'lodash'
import { useAuth } from '@/hooks'
import { Address as AddressCtrl } from '@/api'
import { Address } from './Address'

const addressCtrl = new AddressCtrl()

export function ListAddresses(props) {
  const { reload, onReload } = props
  const { user } = useAuth()
  const [addresses, setAddresses] = useState(null)
  useEffect(() => {
    ;(async () => {
      try {
        const response = await addressCtrl.getAll(user.id)
        setAddresses(response.data)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [reload])
  if(!addresses) return null
  return (
    <div className={styles.addresses}>
      {map(addresses, (address) => (
        <Address
          key={address.id}
          addressId={address.id}
          address={address.attributes}
          onReload={onReload}
        />
      ))}
    </div>
  )
}
