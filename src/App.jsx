import './App.css';
import { Typography, Box } from '@mui/material';
import { LoginForm } from './pages';

function App() {
  return (
    <Box
      className='App'
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
    >
      <Typography variant='h2' mb='20px' textAlign='center'>
        Gentleman - Testing
      </Typography>
      <LoginForm />
    </Box>
  );
}

export default App;
