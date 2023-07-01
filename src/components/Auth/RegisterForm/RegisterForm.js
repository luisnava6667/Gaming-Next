import { Form } from 'semantic-ui-react'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './RegisterForm.form'
import { useRouter } from 'next/router'
import { Auth } from '@/api'
const authCtrl = new Auth()
export function RegisterForm() {
  const router = useRouter()
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        await authCtrl.register(values)
        router.push('/join/sign-in')
      } catch (error) {
        console.error(error)
      }
    }
  })
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group widths='equal'>
        <Form.Input
          name='email'
          placeholder='Correo electronico'
          type='text'
          values={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
        />
        <Form.Input
          name='username'
          placeholder='Nombre de usuario'
          type='text'
          values={formik.values.username}
          onChange={formik.handleChange}
          error={formik.errors.userName}
        />
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Input
          name='name'
          placeholder='Nombre y Apellido'
          type='text'
          values={formik.values.name}
          onChange={formik.handleChange}
          error={formik.errors.name}
        />
        <Form.Input
          name='password'
          placeholder='Contraseña'
          type='password'
          values={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password}
        />
      </Form.Group>
      <Form.Button type='submit' fluid loading={formik.isSubmitting}>
        Registrarse
      </Form.Button>
    </Form>
  )
}
