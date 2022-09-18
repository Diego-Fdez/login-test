import { Typography, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

const InputComponent = ({
  name = '',
  label = '',
  type = 'text',
  disabled = false,
  required = false,
}) => {
  const { register, errors } = useFormContext();

  const formValidations = (errors, errorKey) => {
    return errors[errorKey] ? (
      <Typography color='red'>{errors[errorKey].message}</Typography>
    ) : (
      ''
    );
  };

  return (
    <div>
      <TextField
        required={required}
        {...(disabled ? { disabled } : {})}
        type={type}
        error={errors && !!errors[name]}
        id={name}
        label={label}
        variant='outlined'
        {...register(name)}
        fullWidth
      />
      {errors && formValidations(errors, name)}
    </div>
  );
};

export default InputComponent;
