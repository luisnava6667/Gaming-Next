import { Form } from 'semantic-ui-react'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './AddressForm.form'
import { useAuth } from '@/hooks'
import { Address } from '@/api'
const addressCtrl = new Address()
export function AddressForm(props) {
  const { onClose, onReload, addressId, address } = props
  const { user } = useAuth()
  const formik = useFormik({
    initialValues: initialValues(address),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        if (addressId) {
          await addressCtrl.update(formValues, addressId)
        } else {
          await addressCtrl.create(formValues, user.id)
        }
        formik.handleReset()
        onReload()
        onClose()
      } catch (error) {
        console.error(error)
      }
    }
  })
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        name='title'
        placeholder='Titulo de la dirección'
        onChange={formik.handleChange}
        value={formik.values.title}
        error={formik.errors.title}
      />
      <Form.Group widths='equal'>
        <Form.Input
          name='name'
          placeholder='Nombre y Apellido'
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
        />
        <Form.Input
          name='address'
          placeholder='Dirección'
          onChange={formik.handleChange}
          value={formik.values.address}
          error={formik.errors.address}
        />
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Input
          name='state'
          placeholder='Provincia'
          onChange={formik.handleChange}
          value={formik.values.state}
          error={formik.errors.state}
        />
        <Form.Input
          name='city'
          placeholder='Ciudad'
          onChange={formik.handleChange}
          value={formik.values.city}
          error={formik.errors.city}
        />
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Input
          name='postal_code'
          placeholder='Codigo postal'
          onChange={formik.handleChange}
          value={formik.values.postal_code}
          error={formik.errors.postal_code}
        />
        <Form.Input
          name='phone'
          placeholder='Telefono'
          onChange={formik.handleChange}
          value={formik.values.phone}
          error={formik.errors.phone}
        />
      </Form.Group>
      <Form.Button type='submit' fluid loading={formik.isSubmitting}>
        Enviar
      </Form.Button>
    </Form>
  )
}
