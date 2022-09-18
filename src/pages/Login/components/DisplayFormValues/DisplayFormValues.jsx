import { Typography, Box } from '@mui/material';

const DisplayFormValues = ({ isDirty, isValid, values }) => {
  return (
    <Box color='grey.300' mt='10px'>
      {isDirty && isValid && (
        <>
          <Typography>UserName: {values.userName}</Typography>
          <Typography>Password: {values.password}</Typography>
        </>
      )}
    </Box>
  );
};

export default DisplayFormValues;
