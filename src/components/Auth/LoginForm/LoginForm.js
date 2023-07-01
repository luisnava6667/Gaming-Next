import { Form } from 'semantic-ui-react'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './LoginForm.form'
import { useRouter } from 'next/router'
import { Auth } from '@/api'
import { useAuth } from '@/hooks'

const authCtrl = new Auth()

export function LoginForm() {
  const {login}=useAuth()
  const router = useRouter()
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const response = await authCtrl.login(values)
        login(response.jwt)
        // router.push('/')
      } catch (error) {
        console.error(error)
      }
    }
  })
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        name='identifier'
        placeholder='Correo electronico o nombre de usuario'
        type='text'
        values={formik.values.identifier}
        onChange={formik.handleChange}
        error={formik.errors.identifier}
      />
      <Form.Input
        name='password'
        placeholder='Contraseña'
        type='password'
        values={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <Form.Button type='submit' fluid>
        Entrar
      </Form.Button>
    </Form>
  )
}
