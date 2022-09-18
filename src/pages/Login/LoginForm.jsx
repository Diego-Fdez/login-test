import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputComponent, CustomButton } from '../../components';
import { DisplayFormValues } from './';
import { Box } from '@mui/material';
import { LoginFormSchema } from '../schemas/LoginFormSchema';
import { callEndPoint } from '../services/callEndPoint';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm({
    defaultValues: { userName: '', password: '' },
    mode: 'onChange',
    resolver: yupResolver(LoginFormSchema),
  });
  const userNameWatch = watch('userName');
  const passwordWatch = watch('password');

  const onSubmit = async (data) => {
    const result = await callEndPoint(data);
    console.log(result);
    reset();
  };

  return (
    <Box
      sx={{
        bgcolor: '#fff',
        borderRadius: '30px',
        p: '50px',
        width: '50%',
      }}
    >
      <FormProvider {...{ register, errors }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <InputComponent name='userName' label='UserName' required={true} />
            <InputComponent
              name='password'
              label='password'
              type='text'
              required={true}
            />
            <CustomButton isDirty={isDirty} isValid={isValid} type='submit'>
              Login
            </CustomButton>
          </Box>
        </form>
      </FormProvider>
      <DisplayFormValues
        isDirty={isDirty}
        isValid={isValid}
        values={{ userName: userNameWatch, password: passwordWatch }}
      />
    </Box>
  );
};

export default LoginForm;
