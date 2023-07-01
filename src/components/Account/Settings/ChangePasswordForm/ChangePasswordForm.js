import styles from './ChangePasswordForm.module.scss'
import { useFormik } from 'formik'
import { initialValues, validaionSchema } from './ChangePasswordForm.form'
import { User } from '@/api'
import { useAuth } from '@/hooks'
import { Form } from 'semantic-ui-react'
const userCtrl = new User()
export function ChangePasswordForm() {
  const { user, logout } = useAuth()
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validaionSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        await userCtrl.updateMe(user.id, { password: formValues.password })
        formik.handleReset()
        logout()
      } catch (error) {
        console.error(error)
      }
    }
  })
  return (
    <Form className={styles.form} onSubmit={formik.handleSubmit}>
      <label>Cambiar Contraseña</label>
      <Form.Input
        type='password'
        name='password'
        placeholder='Nueva contraseña'
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <Form.Input
        type='password'
        name='repetirPassword'
        placeholder='Repetir contraseña'
        value={formik.values.repetirPassword}
        onChange={formik.handleChange}
        error={formik.errors.repetirPassword}
      />
      <Form.Button type='submit' loading={formik.isSubmitting}>
        Enviar
      </Form.Button>
    </Form>
  )
}
