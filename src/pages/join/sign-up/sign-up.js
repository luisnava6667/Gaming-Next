import { JoinLayout } from '@/layouts'
import styles from './sign-up.module.scss'
import { RegisterForm } from '@/components/Auth'
import Link from 'next/link'
import { Seo } from '@/components/Shared'
export default function SingUpPage() {
  return (
    <>
      <Seo title='Registrate' />
      <JoinLayout>
        <div className={styles.signUp}>
          <h3 className={styles.signUp}>Crear Cuenta</h3>
          <RegisterForm />
          <div className={styles.actions}>
            <Link href='/join/sign-in'>Atras</Link>
          </div>
        </div>
      </JoinLayout>
    </>
  )
}
