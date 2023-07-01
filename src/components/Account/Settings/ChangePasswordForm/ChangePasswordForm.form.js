import * as Yup from 'yup'
export function initialValues() {
  return {
    password: '',
    repetirPassword: ''
  }
}
export function validaionSchema() {
  return Yup.object({
    password: Yup.string().required(true),
    repetirPassword: Yup.string()
      .required(true)
      .oneOf([Yup.ref('password')], true)
  })
}
