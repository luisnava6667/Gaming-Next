import { Tab } from 'semantic-ui-react'
import { Info, Settings, Address, Wishlist, Orders } from '@/components/Account'
import styles from './account.module.scss'
import { BasicLayout } from '@/layouts'
import { useAuth } from '@/hooks'
import { useRouter } from 'next/router'
import { Seo, Separator } from '@/components/Shared'
import { useState } from 'react'
export default function AccountPage() {
  const [reload, setReload] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()
  if (!user) {
    router.push('/')
    return null
  }
  const onReload = () => setReload((prevState) => !prevState)
  const panes = [
    {
      menuItem: 'Mis Pedidos',
      render: () => (
        <Tab.Pane attached={false}>
          <Orders />
          <Separator height={80}/>
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Lista de Deseos',
      render: () => (
        <Tab.Pane attached={false}>
          <Wishlist />
          <Separator height={80}/>
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Direcciones',
      render: () => (
        <Tab.Pane attached={false}>
          <Address.AddAddress onReload={onReload} />
          <Address.ListAddresses reload={reload} onReload={onReload} />
          <Separator height={80} />
        </Tab.Pane>
      )
    },
    {
      menuItem: { key: 20, icon: 'settings', content: 'Ajustes' },
      render: () => (
        <Tab.Pane attached={false}>
          <Settings.ChangeNameForm />
          <div className={styles.containerForms}>
            <Settings.ChangeEmailForm />
            <Settings.ChangePasswordForm />
          </div>
          <Separator height={80} />
        </Tab.Pane>
      )
    },
    {
      menuItem: {
        key: 21,
        icon: 'log out',
        content: '',
        onClick: logout
      }
    }
  ]
  return (
    <>
    <Seo title='Mi cuenta' />
      <BasicLayout isContainer relative>
        <Info />
        <Tab
          menu={{ secondary: true, pointing: true }}
          panes={panes}
          className={styles.tabs}
        />
      </BasicLayout>
    </>
  )
}
