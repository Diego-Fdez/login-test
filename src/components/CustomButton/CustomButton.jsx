import { Button } from '@mui/material';

const CustomButton = ({ isDirty, isValid, children, type }) => {
  return (
    <Button
      type={type}
      fullWidth
      variant='contained'
      disabled={!isDirty || !isValid}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
