import * as yup from 'yup';

export const LoginFormSchema = yup.object({
  userName: yup
    .string()
    .required('Username is required')
    .max(12, 'the username cannot be longer than 12 characters'),
  password: yup
    .string()
    .required('Password is required')
    .max(12, 'the username cannot be longer than 12 characters')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'the password must be alphanumeric, and contain a maximum of 12 characters, one uppercase and one special character'
    )
    .required(),
});
